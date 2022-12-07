import React, { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
} from '@mui/material';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import Url from '../../utils/Url';
import prettyBytes from '../../utils/pretyBytes';

const SystemMonitor = ({ token, logout, ...props }) => {
  const [process_list, setProcessList] = useState([]);

  const updateProcessList = async () => {
    try {
      const res = await fetch(Url.getSystemInfoUrl(), {
        headers: { Authorization: token },
      });
      const json = await res.json();
      if (!json.data) return [];

      let equal = process_list.length === json.data.length;
      json.data.process.forEach(({ pid }) => {
        equal = equal && process_list.find((process) => pid === process.pid);
      });
      if (!equal) return json.data.process;
      else return [];
    } catch (error) {
      console.error(error);
    }
    return [];
  };

  useEffect(() => {
    // if (token == null) return;
    let ok = true;
    const run = async () => {
      let tmp_data = await updateProcessList();
      if (!ok) return;
      if (tmp_data) setProcessList(tmp_data);
    };
    run();
    const interval = setInterval(() => run(false), 1000);
    return () => {
      ok = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <Container>
      <Box
        padding={1}
        borderRadius={1}
        boxShadow={2}
        mt={1}
        backgroundColor={'lightgrey'}
      >
        <Typography variant="h6">Process</Typography>
      </Box>
      {/* <LockerOcupationList process_list={process_list} /> */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>PID</TableCell>
            <TableCell>USER</TableCell>
            <TableCell>PR</TableCell>
            <TableCell>NICE</TableCell>
            <TableCell>VIRTUAL MEM</TableCell>
            <TableCell>SHARED MEM</TableCell>
            <TableCell>STATE</TableCell>
            <TableCell>CPU</TableCell>
            <TableCell>MEM</TableCell>
            <TableCell>COMMAND</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {process_list.map((process) => (
            <TableRow>
              <TableCell>{process.pid}</TableCell>
              <TableCell>{process.user}</TableCell>
              <TableCell>{process.priority}</TableCell>
              <TableCell>{process.nice}</TableCell>
              <TableCell>{prettyBytes(process.virtual_memory)}</TableCell>
              <TableCell>{prettyBytes(process.shared_memory)}</TableCell>
              <TableCell>{process.state}</TableCell>
              <TableCell>{`${process.pct_cpu} %`}</TableCell>
              <TableCell>{`${process.pct_mem} %`}</TableCell>
              <TableCell>{process.command}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  ...ownProps,
});

export default connect(mapStateToProps, { logout })(SystemMonitor);
