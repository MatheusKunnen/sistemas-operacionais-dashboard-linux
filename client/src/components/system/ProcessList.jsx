import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Divider,
} from '@mui/material';
import { connect } from 'react-redux';
import { logout } from '../../redux/actions/auth';
import prettyBytes from '../../utils/pretyBytes';

const ProcessList = ({ token, processes, sysInfo, ...props }) => {
  return (
    <Box padding={'1rem'} borderRadius={1} boxShadow={2} mt={1}>
      <Typography variant="h6">{`Processos (${processes.length})`}</Typography>
      <Divider />
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
          {processes
            .sort((a, b) => a.pct_cpu > b.pct_cpu)
            .map((process) => (
              <TableRow key={`p-${process.pid}`}>
                <TableCell sx={{ textAlign: 'right' }}>{process.pid}</TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {process.user}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {process.priority}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {process.nice}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {prettyBytes(process.virtual_memory)}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {prettyBytes(process.shared_memory)}
                </TableCell>
                <TableCell sx={{ textAlign: 'right' }}>
                  {process.state}
                </TableCell>
                <TableCell
                  sx={{ textAlign: 'right' }}
                >{`${process.pct_cpu} %`}</TableCell>
                <TableCell
                  sx={{ textAlign: 'right' }}
                >{`${process.pct_mem} %`}</TableCell>
                <TableCell sx={{ textAlign: 'left' }}>
                  {process.command}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Box>
  );
};

const mapStateToProps = (state, ownProps) => ({
  token: state.auth.token,
  processes: state.systemInfo.processes,
  sysInfo: state.systemInfo,
  ...ownProps,
});

export default connect(mapStateToProps, { logout })(ProcessList);
