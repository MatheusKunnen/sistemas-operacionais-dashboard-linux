import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import {
  updateDiskStats,
  updateSystemStatus,
} from '../../redux/actions/systemInformation';

const SystemInfoProvider = ({
  updateDiskStats,
  updateSystemStatus,
  ...props
}) => {
  useEffect(() => {
    const interval = setInterval(() => {
      updateSystemStatus();
      updateDiskStats();
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
})(SystemInfoProvider);
