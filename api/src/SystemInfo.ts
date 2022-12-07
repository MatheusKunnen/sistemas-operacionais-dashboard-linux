import DiskInformation from './types/DiskInformation';
import MemoryInformation from './types/MemoryInformation';
import ProcessorInformation from './types/ProcessorInformation';
import ProcessInformation from './types/ProcessInformation';
import SystemInformation from './types/SystemInformation';

import { exec } from 'child_process';

export default class SystemInfo {
  constructor() {}

  public async getProcessorInformation(): Promise<null | ProcessorInformation> {
    const data = String(await this.runCommand('cat /proc/cpuinfo'));
    const linhas = data.split('\n');

    const model = linhas[4].split(':')[1].trim();
    const nucleos = +linhas[12].split(':')[1].trim();
    const threads = +linhas[10].split(':')[1].trim();

    return {
      cores: nucleos,
      processors: threads,
      model: model,
    };
  }

  public async getMemoryInformation(): Promise<null | MemoryInformation> {
    const data = String(await this.runCommand('cat /proc/meminfo'));
    const linhas = data.split('\n');

    const mem_total = Number(
      linhas[0].toLowerCase().replace('memtotal:', '').replace('kb', '').trim()
    );

    const mem_livre = Number(
      linhas[1].toLowerCase().replace('memfree:', '').replace('kb', '').trim()
    );

    const mem_cache = Number(
      linhas[4].toLowerCase().replace('cached:', '').replace('kb', '').trim()
    );

    const mem_buffers = Number(
      linhas[3].toLowerCase().replace('buffers:', '').replace('kb', '').trim()
    );

    const mem_total_swap = Number(
      linhas[14]
        .toLowerCase()
        .replace('swaptotal:', '')
        .replace('kb', '')
        .trim()
    );

    const mem_free_swap = Number(
      linhas[15].toLowerCase().replace('swapfree:', '').replace('kb', '').trim()
    );

    return {
      total_memory: mem_total,
      free_memory: mem_livre,
      cache_memory: mem_cache,
      buffers_memory: mem_buffers,
      total_swap_memory: mem_total_swap,
      free_swap_memory: mem_free_swap,
    };
  }

  public async getDiskInformations(): Promise<null | DiskInformation[]> {
    const data = String(await this.runCommand('df -l'));
    const linhas = data.split('\n');
    const discos = linhas
      .filter((linha) => {
        return linha.length > 0 && linha.indexOf('none') !== 0;
      })
      .slice(1)
      .map((disco) => {
        const [filesystem, blocks_1k, used, available, perc_use, mounted_on] =
          disco.trim().replace(/  +/g, ' ').split(' ');
        return {
          filesystem: filesystem,
          _1k_blocks: Number(blocks_1k),
          used: Number(used),
          available: Number(available),
          used_pct: Number(perc_use.replace('%', '')),
          mounted_on: mounted_on,
        } as DiskInformation;
      });

    return discos;
  }

  public async getSystemInformation(): Promise<null | SystemInformation> {
    const data = String(await this.runCommand('top -b -n1'));
    const linhas = data.split('\n');

    const info = linhas[0].split('users,').map((i) =>
      i
        .replace('top - ', '')
        .replace('load average: ', '')
        .split(',')
        .map((e) => e.trim())
    );

    const [load5, load10, load15] = info[1].map((l) => Number(l));
    const num_users = Number(info[0].length == 2 ? info[0][1] : info[0][2]);
    let uptime = 0;
    if (info[0].length == 2) {
      // Caso uptime < 1 dia
      uptime =
        Number(info[0][0].split('up')[1].trim().split(':')[0]) * 60 * 60 + // Conversão de horas para segundos
        Number(info[0][0].split('up')[1].trim().split(':')[1]) * 60; // Conversão de minutos para segundos
    } else {
      // Caso uptime >= 1 dia
      uptime =
        Number(info[0][0].split('up')[1].trim().split(' ')[0]) * 24 * 60 * 60 + // Conversão de dias para segundos
        Number(info[0][1].trim().split(':')[0]) * 60 * 60 + // Conversão de horas para segundos
        Number(info[0][1].trim().split(':')[1]) * 60; // Conversão de minutos para segundos
    }

    const [t_total, t_running, t_sleeping, t_stopped, t_zombie] = linhas[1]
      .toLowerCase()
      .replace('tasks:', '')
      .split(',')
      .map((i) => Number(i.trim().split(' ')[0]));

    const cpu = linhas[2]
      .toLowerCase()
      .replace('%cpu(s):', '')
      .split(',')
      .map((i) => Number(i.trim().split(' ')[0]));

    const ram = linhas[3]
      .toLowerCase()
      .replace('mib mem :', '')
      .split(',')
      .map((i) => Number(i.trim().split(' ')[0]));

    const swap = linhas[4]
      .toLowerCase()
      .replace('mib swap:', '')
      .split(',')
      .map((i) => Number(i.trim().split(' ')[0]));

    const mem_available = Number(
      linhas[4].split('used.')[1].trim().split(' ')[0]
    );

    const process = linhas
      .slice(7)
      .filter((proc) => proc.length > 0)
      .map((proc) => {
        const [
          pid,
          user,
          pr,
          ni,
          virt,
          res,
          shr,
          s,
          pct_cpu,
          pct_mem,
          time,
          command,
        ] = proc.trim().replace(/  +/g, ' ').split(' ');
        return {
          pid: Number(pid),
          user: user,
          priority: Number(pr),
          nice: Number(ni),
          virtual_memory: Number(virt),
          used_memory: Number(res),
          shared_memory: Number(shr),
          state: s,
          pct_cpu: Number(pct_cpu),
          pct_mem: Number(pct_mem),
          time: Number(time.split(':')[0]) * 60 + Number(time.split(':')[1]),
          command: command,
        } as ProcessInformation;
      });

    return {
      uptime,
      load_5: load5,
      load_10: load10,
      load_15: load15,
      total_memory: ram[0],
      free_memory: ram[1],
      used_memory: ram[2],
      buffers_memory: ram[3],
      total_swap: swap[0],
      free_swap: swap[1],
      used_swap: swap[2],
      user_cpu_usage: cpu[0],
      system_cpu_usage: cpu[1],
      inactive_cpu_usage: cpu[3],
      io_cpu_usage: cpu[4],
      hi_cpu_usage: cpu[5],
      si_cpu_usage: cpu[6],
      total_tasks: t_total,
      running_tasks: t_running,
      sleeping_tasks: t_sleeping,
      stopped_tasks: t_stopped,
      zombie_tasks: t_zombie,
      process,
    };
  }

  public async test(): Promise<null | void> {
    // console.log(await this.getProcessorInformation());
    // console.log(await this.getMemoryInformation());
    //console.log(await this.getDiskInformations());
    // console.log(await this.getSystemInformation());
    return null;
  }

  public runCommand(command: string): Promise<any> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout) => {
        if (error) return reject(error);
        resolve(stdout);
      });
    });
  }
}
