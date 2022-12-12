export default interface DiskInformation {
  device:String;
  tps: number;
  read_per_s: number;
  write_per_s: number;
  discart_per_s: number;
  total_read: number;
  total_write: number;
  total_discard: number;

  // major_number: number;
  // minor_mumber: number;
  // device_name: String;
  // reads_completed_successfully: number;
  // reads_merged: number;
  // sectors_read: number;
  // time_spent_reading: number;
  // writes_completed: number;
  // writes_merged: number;
  // sectors_written: number;
  // time_spent_writing: number;
  // io_currently_in_progress: number;
  // time_spent_doing_io: number;
  // weighted_time_spent_doing_io: number;
}
