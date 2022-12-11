import Url from '../../utils/Url';
import {
  ON_UPDATE_SYSTEM_STATUS,
  ON_UPDATE_SYSTEM_INFORMATION,
  ON_UPDATE_DISK_INFO,
} from '../types';
import rfetch from './rfetch';

export const updateSystemStatus = () => async (dispatch, getState) => {
  try {
    const url = Url.getSystemInfoUrl();
    const res = await rfetch(
      url,
      {
        useAuth: true,
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_UPDATE_SYSTEM_STATUS, payload: json.data });
    }
  } catch (err) {
    console.error(err);
  }
};

export const updateDiskStats = () => async (dispatch, getState) => {
  try {
    const url = Url.getDiskInfoUrl();
    const res = await rfetch(
      url,
      {
        useAuth: true,
      },
      dispatch,
      getState
    );
    const json = await res.json();
    if (res.status === 200) {
      dispatch({ type: ON_UPDATE_DISK_INFO, payload: json.data });
    }
  } catch (err) {
    console.error(err);
  }
};
