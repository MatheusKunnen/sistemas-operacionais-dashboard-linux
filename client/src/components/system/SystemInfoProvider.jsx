import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { updateSystemStatus } from '../../redux/actions/systemInformation';

const SystemInfoProvider = ({ updateSystemStatus, ...props }) => {
  useEffect(() => {
    const interval = setInterval(() => updateSystemStatus(), 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line
  }, []);
  return <></>;
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
});

export default connect(mapStateToProps, { updateSystemStatus })(
  SystemInfoProvider
);
