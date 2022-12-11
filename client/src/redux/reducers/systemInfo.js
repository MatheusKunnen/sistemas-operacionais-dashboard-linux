import { ON_UPDATE_SYSTEM_STATUS } from '../types';

const initialState = {
  system_status: null,
  processes: [],
  system_status_history: [],
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

    default:
      return state;
  }
};

export default authReducer;
