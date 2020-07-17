import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine,
} from 'recharts';

const data = [
  {
    name: 'Jan', uv: [4000, -2000]
  },
  {
    name: 'Feb', uv: -3000
  },
  {
    name: 'Mar', uv: -2000
  },
  {
    name: 'Apr', uv: 2780
  },
  {
    name: 'May', uv: -1890
  },
  {
    name: 'Jun', uv: 2390
  },
  {
    name: 'Jul', uv: 3490
  },
];

export default class Chart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/q68cz43w/';

  render() {
    return (
      <BarChart
        width={this.props.width}
        height={300}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name"/>
        <YAxis />
        <Tooltip />
        <Bar dataKey="uv" fill="#a897ff" />
        <ReferenceLine y={0} stroke="#000000" isFront={true}/>
      </BarChart>
    );
  }
}
