import {
  ON_UPDATE_SYSTEM_STATUS,
  ON_UPDATE_DISK_INFO,
  ON_UPDATE_DISK_IO_INFO,
} from '../types';

const initialState = {
  system_status: null,
  processes: [],
  system_status_history: [],
  disk_info: [],
  disk_io_history: [],
};
const max_history = 60;
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case ON_UPDATE_SYSTEM_STATUS:
      const system_status_history = [
        ...state.system_status_history,
        {
          ...action.payload,
          date: Date(),
          process: action.payload.process.length,
        },
      ];
      return {
        ...state,
        system_status_history:
          system_status_history.length > max_history
            ? system_status_history.slice(-max_history)
            : system_status_history,
        system_status: { ...action.payload, process: undefined },
        processes: action.payload.process ? action.payload.process : [],
      };
    case ON_UPDATE_DISK_INFO:
      return {
        ...state,
        disk_info: action.payload,
      };
    case ON_UPDATE_DISK_IO_INFO:
      const disk_io_history = [
        ...state.disk_io_history,
        {
          data: action.payload,
          date: Date(),
        },
      ];
      return {
        ...state,
        disk_io_history:
          disk_io_history.length > max_history
            ? disk_io_history.slice(-max_history)
            : disk_io_history,
        disk_io: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
