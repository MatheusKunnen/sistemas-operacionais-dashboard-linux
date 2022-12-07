export default interface ProcessInformation {
  pid: number;
  user: String;
  priority: number;
  nice: number;
  virtual_memory: number;
  used_memory: number;
  shared_memory: number;
  state: String;
  time: number;
  command: String;
}
