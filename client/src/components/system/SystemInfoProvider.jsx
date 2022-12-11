import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import {
  updateDiskStats,
  updateDiskIOStats,
  updateSystemStatus,
} from '../../redux/actions/systemInformation';

const SystemInfoProvider = ({
  updateDiskStats,
  updateDiskIOStats,
  updateSystemStatus,
  ...props
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateSystemStatus();
      updateDiskStats();
      updateDiskIOStats();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  return <></>;
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

export default connect(mapStateToProps, {
  updateSystemStatus,
  updateDiskStats,
  updateDiskIOStats,
})(SystemInfoProvider);
