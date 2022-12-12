import React from 'react';
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

const LoadGraph = ({ system_status_history, height, ...props }) => {
  if (typeof height === 'undefined') height = 300;
  return (
    <ResponsiveContainer height={height} {...props}>
      <LineChart
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
        <CartesianGrid strokeDasharray="10 10" stroke="#f5f5f5" />
        <Line
          animationDuration={getAnimationDuration()}
          dot={false}
          type="monotone"
          dataKey="load_5"
          yAxisId={0}
          stroke="#b30000"
        />
        <Line
          animationDuration={getAnimationDuration()}
          dot={false}
          type="monotone"
          dataKey="load_10"
          yAxisId={0}
          stroke="#FCE700"
        />
        <Line
          animationDuration={getAnimationDuration()}
          dot={false}
          type="monotone"
          dataKey="load_15"
          yAxisId={0}
          stroke="#FF6D28"
        />
        {/* <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} /> */}
      </LineChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  system_status_history: state.systemInfo.system_status_history,
  ...ownProps,
});

export default connect(mapStateToProps, {})(LoadGraph);
