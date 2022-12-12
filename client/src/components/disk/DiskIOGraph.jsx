import { Box, Menu, MenuItem, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { getAnimationDuration } from '../../utils/Env';
import prettyBytes from '../../utils/pretyBytes';

const getDiskObj = (disk_info, disk) => {
  return disk_info
    .map((disks) => {
      const dd = disks.data.find((da) => da.device === disk);
      if (!dd) return null;

      return { ...dd, date: disks.date };
    })
    .filter((e) => e !== null);
};

const DiskIOGraph = ({ disk_info, d_disk, height, ...props }) => {
  const [disk_name, setDisk] = useState(
    typeof d_disk === 'string' ? d_disk : null
  );

  const disk = disk_name === null ? [] : getDiskObj(disk_info, disk_name);

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (d) => {
    if (typeof d !== 'undefined') setDisk(d);
    setAnchorEl(null);
  };

  if (typeof height === 'undefined') height = 300;

  if (disk_info === null) return <></>;

  const devices =
    disk_info.length <= 0 ? [] : disk_info[0].data.map((e) => e.device);
  // console.log(devices);
  return (
    <Box>
      {typeof d_disk !== 'string' ? (
        <Button onClick={handleMenuClick}>
          {disk_name ? `Disco:${disk_name}` : 'Selecione um disco'}
        </Button>
      ) : (
        <></>
      )}
      {disk_name !== null ? (
        <Box display="flex" flexWrap={'wrap'} color="black">
          <ResponsiveContainer height={height} {...props}>
            <LineChart
              data={disk}
              // margin={'auto auto'}
            >
              <XAxis
                dataKey="date"
                tickFormatter={(item) => {
                  const date = new Date(Date.parse(item));
                  return `${String(date.getHours()).padStart(2, '0')}:${String(
                    date.getMinutes()
                  ).padStart(2, '0')}:${String(date.getSeconds()).padStart(
                    2,
                    '0'
                  )}`;
                }}
              />
              <YAxis tickFormatter={(label) => prettyBytes(label)} />
              <Tooltip formatter={(label) => prettyBytes(label)} />
              <CartesianGrid strokeDasharray="10 10" stroke="#f5f5f5" />
              <Line
                animationDuration={getAnimationDuration()}
                dot={false}
                type="monotone"
                dataKey="read_per_s"
                name="LEITURA"
                yAxisId={0}
                stroke="#b30000"
              />
              <Line
                animationDuration={getAnimationDuration()}
                dot={false}
                type="monotone"
                dataKey="write_per_s"
                name="ESCRITURA"
                yAxisId={0}
                stroke="#FCE700"
              />
              {/* <Line
                animationDuration={getAnimationDuration()}
                dot={false}
                type="monotone"
                daname="DESCARTADO"
                taKey="discard_per_s"
                yAxisId={0}
                stroke="#FF6D28"
              /> */}
            </LineChart>
          </ResponsiveContainer>
        </Box>
      ) : (
        <></>
      )}

      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        MenuListProps={{
          role: 'listbox',
        }}
      >
        {devices.map((d) => (
          <MenuItem key={d} name="btn-25" onClick={() => handleClose(d)}>
            {d}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  disk_info: state.systemInfo.disk_io_history,
  ...ownProps,
});

export default connect(mapStateToProps, {})(DiskIOGraph);
