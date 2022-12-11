import { Box, Button, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';

const PanelItem = ({
  onRemove,
  index,
  title,
  children,
  disableButtons,
  dWidth,
  ...props
}) => {
  const [width, setWidth] = useState(isNaN(dWidth) ? 100 : dWidth);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (w) => {
    if (!isNaN(w)) setWidth(w);
    setAnchorEl(null);
  };
  return (
    <Box
      width={`${width}%`}
      boxShadow={1}
      borderRadius={1}
      padding={'0.5rem'}
      margin={'0.5rem'}
      paddingTop={'0.25rem'}
      {...props}
    >
      <Box display={'flex'} justifyContent="space-between">
        <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 1 }}>
          {String(title).toUpperCase()}
        </Typography>
        {!disableButtons ? (
          <>
            <Button id="config-btn" onClick={handleMenuClick}>
              Config
            </Button>
            <Button
              onClick={() => onRemove()}
              color="error"
              sx={{ minWidth: 0 }}
            >
              X
            </Button>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Box>{children}</Box>
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
        <MenuItem name="btn-25" onClick={() => handleClose(23)}>
          25%
        </MenuItem>
        <MenuItem name="btn-50" onClick={() => handleClose(48)}>
          50%
        </MenuItem>
        <MenuItem name="btn-75" onClick={() => handleClose(73)}>
          75%
        </MenuItem>
        <MenuItem name="btn-100" onClick={() => handleClose(100)}>
          100%
        </MenuItem>
      </Menu>
    </Box>
  );
};

PanelItem.defaultProps = {
  onRemove: () => {},
  title: '',
};

export default PanelItem;
