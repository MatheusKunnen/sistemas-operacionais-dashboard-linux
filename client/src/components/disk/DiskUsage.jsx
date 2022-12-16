import { Box, Menu, MenuItem, Button, Typography } from '@mui/material';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { getAnimationDuration } from '../../utils/Env';
import prettyBytes from '../../utils/pretyBytes';

const getDiskObj = (disk) => ({
  ...disk,
  name: disk.filesystem,
  data: [
    { name: 'Usado', value: disk.used_pct },
    { name: 'Livre', value: 100 - disk.used_pct },
  ],
});

const DiskUsage = ({ disk_info, d_disk, height, ...props }) => {
  const [disk, setDisk] = useState(
    disk_info.length > 0
      ? getDiskObj(disk_info[isNaN(d_disk) ? 0 : d_disk])
      : null
  );

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (d) => {
    if (typeof d !== 'undefined') setDisk(getDiskObj(d));
    setAnchorEl(null);
  };

  if (typeof height === 'undefined') height = 300;

  if (disk_info === null) return <></>;
  const infos = disk
    ? [
        { label: 'Dispositivo', value: disk.filesystem },
        { label: 'Capacidade', value: prettyBytes(disk.available) },
        { label: 'Usado', value: prettyBytes(disk.used) },
        { label: 'Livre', value: prettyBytes(disk.available - disk.used) },
        { label: 'Localização', value: disk.mounted_on },
      ]
    : [];
  return (
    <Box>
      {isNaN(d_disk) ? (
        <Button onClick={handleMenuClick}>
          {disk ? `Disco:${disk.name}` : 'Selecione um disco'}
        </Button>
      ) : (
        <></>
      )}
      {disk !== null ? (
        <Box display="flex" flexWrap={'wrap'} color="black">
          <ResponsiveContainer width="50%" height={height} {...props}>
            <PieChart>
              <Tooltip />
              <Pie
                animationDuration={getAnimationDuration()}
                data={disk.data}
                dataKey="value"
                nameKey={'name'}
                fill="green"
                paddingAngle={1}
                minAngle={2}
                // legendType="line"
                label={(entry) => `${entry.name} (${entry.value}%)`}
              >
                {disk.data.map((entry, index) => (
                  <Cell
                    key={entry}
                    fill={index === 1 ? '#0086b3' : '#a90000'}
                  />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <Box displat="flex">
            {infos.map(({ label, value }) => (
              <Box
                key={`${label}-${disk.filesystem}`}
                display="flex"
                flexDirection="column"
              >
                <Typography variant="h5">{label}</Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>
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
        {disk_info.map((d) => (
          <MenuItem key={d} name="btn-25" onClick={() => handleClose(d)}>
            {d.filesystem}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  disk_info: state.systemInfo.disk_info,
  ...ownProps,
});

export default connect(mapStateToProps, {})(DiskUsage);
