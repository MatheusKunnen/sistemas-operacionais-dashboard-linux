import { ON_UPDATE_SYSTEM_STATUS, ON_UPDATE_DISK_INFO } from '../types';

const initialState = {
  system_status: null,
  processes: [],
  system_status_history: [],
  disk_info: [],
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
    default:
      return state;
  }
};

export default authReducer;
