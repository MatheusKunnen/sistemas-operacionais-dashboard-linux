import { Box, Menu, MenuItem, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import prettyBytes from '../../utils/pretyBytes';
import PanelItem from '../layout/PanelItem';
import DiskUsage from './DiskUsage';

const DiskUsageList = ({ disk_info, height, ...props }) => {
  return (
    <Box display="flex" flexWrap={'wrap'} justifyContent="center">
      {disk_info.map((disk, i) => (
        <PanelItem
          key={`disks-${disk.filesystem}-${i}`}
          dWidth={48}
          disableButtons={true}
        >
          <DiskUsage d_disk={i} />
        </PanelItem>
      ))}
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  disk_info: state.systemInfo.disk_info,
  ...ownProps,
});

export default connect(mapStateToProps, {})(DiskUsageList);
