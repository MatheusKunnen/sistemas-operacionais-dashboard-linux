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
import { getAnimationDuration } from '../../utils/Env';
import prettyBytes from '../../utils/pretyBytes';

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
        <YAxis tickFormatter={(label) => prettyBytes(label)} />

        <Tooltip formatter={(label) => prettyBytes(label)} />
        <CartesianGrid stroke="#f5f5f5" />
        <Area
          animationDuration={getAnimationDuration()}
          dataKey="total_memory"
          name="MEMORIA TOTAL"
          yAxisId={0}
          stroke="#0086b3"
          fill="#0086b3"
          opacity="100%"
        />

        <Area
          animationDuration={getAnimationDuration()}
          dataKey="free_memory"
          name="MEMORIA LIVRE"
          yAxisId={0}
          stroke="#cc0052"
          fill="#cc0052"
          opacity="100%"
        />
        <Area
          animationDuration={getAnimationDuration()}
          dataKey="used_memory"
          name="MEMORIA USADA"
          yAxisId={0}
          stroke="#a90000"
          fill="#a90000"
          opacity="100%"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

const mapStateToProps = (state, ownProps) => ({
  system_status_history: state.systemInfo.system_status_history,
  ...ownProps,
});

export default connect(mapStateToProps, {})(LoadGraph);
