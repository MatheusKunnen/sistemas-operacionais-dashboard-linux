export default interface DiskInformation {
  filesystem: String;
  used: number;
  available: number;
  _1k_blocks: number;
  used_pct: number;
  mounted_on: String;
}
