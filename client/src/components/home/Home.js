import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import SystemMonitor from '../system/SystemMonitor';
import LoadGraph from '../system/LoadGraph';
import PanelItem from '../layout/PanelItem';
import MemoryGraph from '../system/MemoryGraph';

const items = [
  {
    id: 'system-load',
    title: 'Carga do sistema',
    component: LoadGraph,
  },
  {
    id: 'ram-usage',
    title: 'Uso de RAM',
    component: MemoryGraph,
  },
];

const Home = () => {
  const [tab, setTab] = useState('1');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [panels, setPanels] = useState([]);

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const onOpenDrawer = () => setDrawerOpen(true);

  const onAddPanel = (e) => {
    setPanels([
      ...panels,
      {
        key: `${panels.length}-${e.id}`,
        title: e.title,
        component: <e.component />,
      },
    ]);
  };

  const onRemovePanel = (key) => {
    setPanels([...panels.filter((item) => key !== item.key)]);
  };
  return (
    <Box display="flex" flexDirection="column">
      <Drawer
        anchor={'top'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={() => setDrawerOpen(false)}
          onKeyDown={() => setDrawerOpen(false)}
        >
          <List>
            {items.map((item, index) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton onClick={() => onAddPanel(item)}>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <TabContext value={tab}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} centered>
            <Tab label="Dashboard" value="1" />
            <Tab label="Processos" value="2" />
            <Tab label="Discos" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <>
            <Box
              display="flex"
              flexWrap={'wrap'}
              justifyContent="space-between"
            >
              {panels.map((item, index) => (
                <PanelItem
                  key={`${item.key}`}
                  title={item.title}
                  onRemove={() => onRemovePanel(item.key)}
                >
                  {item.component}
                </PanelItem>
              ))}
            </Box>
            <Button variant="outlined" onClick={onOpenDrawer} fullWidth>
              Adicionar Painel
            </Button>
          </>
        </TabPanel>
        <TabPanel value="2"></TabPanel>
      </TabContext>
    </Box>
  );
};

export default Home;
