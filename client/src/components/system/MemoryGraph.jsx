import React from 'react';
import { connect } from 'react-redux';

import {
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const LoadGraph = ({ system_status_history, height, ...props }) => {
  if (typeof height === 'undefined') height = 300;
  return (
    <ResponsiveContainer height={height}>
      <AreaChart
        data={system_status_history.map((item, i) => ({
          ...item,
          index: i,
        }))}
        // margin={'auto auto'}
      >
        <XAxis
          dataKey="date"
          tickFormatter={(item) => {
            const date = new Date(Date.parse(item));
            return `${String(date.getHours()).padStart(2, '0')}:${String(
              date.getMinutes()
            ).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
          }}
        />
        <YAxis />
        <Tooltip />
        <CartesianGrid stroke="#f5f5f5" />
        <Area
          dataKey="total_memory"
          yAxisId={0}
          stroke="#FCE700"
          fill="#FCE700"
          opacity="100%"
        />

        <Area
          dataKey="free_memory"
          yAxisId={0}
          stroke="#00F5FF"
          fill="#00F5FF"
          opacity="100%"
        />
        <Area
          dataKey="used_memory"
          yAxisId={0}
          stroke="#FF6D28"
          fill="#FF6D28"
          opacity="100%"
        />
        {/* <Area dataKey="buffers_memory" yAxisId={0} stroke="#008a25" /> */}
        {/* <Line dataKey="load_15" yAxisId={0} stroke="#8a0000" /> */}
        {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  system_status_history: state.systemInfo.system_status_history,
  ...ownProps,
});

export default connect(mapStateToProps, {})(LoadGraph);
