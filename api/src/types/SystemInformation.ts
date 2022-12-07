import ProcessInformation from './ProcessInformation';

export default interface SystemInformation {
  uptime: number;
  load_5: number;
  load_10: number;
  load_15: number;
  total_memory: number;
  free_memory: number;
  used_memory: number;
  buffers_memory: number;
  total_swap: number;
  free_swap: number;
  used_swap: number;
  user_cpu_usage: number;
  system_cpu_usage: number;
  inactive_cpu_usage: number;
  io_cpu_usage: number;
  hi_cpu_usage: number;
  si_cpu_usage: number;
  total_tasks: number;
  running_tasks: number;
  sleeping_tasks: number;
  stopped_tasks: number;
  zombie_tasks: number;
  process: ProcessInformation[];
}
