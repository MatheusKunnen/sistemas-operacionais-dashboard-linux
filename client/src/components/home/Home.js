import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SystemMonitor from '../system/SystemMonitor';

const Home = () => {
  const [tab, setTab] = useState('1');
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };
  return (
    <Box>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="System" value="1" />
            <Tab label="Disks" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <SystemMonitor />
        </TabPanel>
        <TabPanel value="2">{/* <LockerUsage /> */}</TabPanel>
        {/* <TabPanel value="3">
          <Configutation />
        </TabPanel> */}
      </TabContext>
    </Box>
  );
};

export default Home;
