export default interface DiskInformation {
  major_number: number;
  minor_mumber: number;
  device_name: String;
  reads_completed_successfully: number;
  reads_merged: number;
  sectors_read: number;
  time_spent_reading: number;
  writes_completed: number;
  writes_merged: number;
  sectors_written: number;
  time_spent_writing: number;
  io_currently_in_progress: number;
  time_spent_doing_io: number;
  weighted_time_spent_doing_io: number;
}
