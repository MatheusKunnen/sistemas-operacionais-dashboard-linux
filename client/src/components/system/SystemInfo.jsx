import React, { useState, useEffect } from 'react';
import { Box, Typography,Button } from '@mui/material';
import prettyBytes from '../../utils/pretyBytes';

const SystemInfo = () => {
  const [info, setInfo] = useState(null);

  // console.log(info);
  const update = async () => {
    const res = await fetch('http://localhost:5100/api/system/cpu');
    const json = await res.json();
    if (json.data) setInfo(json.data);
  };
  useEffect(() => {
    update();
  }, []);

  if (info === null || info === undefined) return <></>;
const openTerminal = () =>{
  try {
    fetch('http://localhost:5100/api/system/terminal')
  }catch(err){
console.error(err);
  }
}
  const {cpu, memory, so} = info;
const items = [
  {
    label: 'Kernel:',
    value: so.trim().split(' ').slice(0, 3).join(' '),
  },
  {
    label: 'CPU Model:',
    value: cpu.model,
  },
  {
    label: 'CPU Cores:',
    value: `${cpu.cores} fisicos | ${cpu.processors} virtuais`,
  },
  {
    label: 'Total RAM:',
    value: prettyBytes( memory.total_memory),
  },
  {
    label: 'Total SWAP:',
    value: prettyBytes(memory.total_swap_memory),
  },
]
  // return <></>;
  return <Box display={"flex"} flexDirection="column" >
    {/* <Typography variant="h5">System Info</Typography> */}
    {/* <Divider/> */}
{
  items.map(({label, value}) => (
<Box key={`${label}-${value}`} display="flex" flexDirection="column" margin="0.5rem" padding="0.5rem" boxShadow="1" borderRadius={1}>
  <Typography variant="h6" sx={{fontWeight:'bold'}}>{label}</Typography>
  <Typography variant="h5">{value}</Typography>
</Box>
  ))
}
<Button variant="outlined" onClick={openTerminal} fullWidth>Abrir terminal</Button>
  </Box>;
};

export default SystemInfo;
