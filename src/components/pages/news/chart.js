import React from 'react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import './chart.css';

const CHART_WIDTH = 500;
const CHART_HEIGHT = 500;

const dateStrToDate = dateStr => {
  const dateStrParts = dateStr.split('-');

  return new Date(dateStrParts[0], dateStrParts[1] - 1, dateStrParts[2]);
};

const Chart = ({ data }) => {
  if (!data) {
    return <div className="chart-ctn">Nothing to see here...</div>;
  }

  // Assuming using Alvin model average
  const alvinAverage = data.alvinAverage;
  const processedData = Object.entries(alvinAverage).map(
    ([sentimentDateStr, sentimentScore]) => {
      const date = dateStrToDate(sentimentDateStr);

      return {
        date,
        dateStr: sentimentDateStr,
        sentiment: sentimentScore.toFixed(4),
      };
    },
  );
  processedData.sort((a, b) => {
    const { date: dateA } = a;
    const { date: dateB } = b;
    console.log(`comparing ${dateA} and ${dateB}`);
    return dateA - dateB;
  });

  return (
    <div className="chart-ctn">
      <LineChart width={CHART_WIDTH} height={CHART_HEIGHT} data={processedData}>
        <CartesianGrid strokeDashArray="3 3" />
        <XAxis dataKey="dateStr" />
        <YAxis dataKey="sentiment" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sentiment" stroke="#ff0000" />
      </LineChart>
    </div>
  );
};

export default Chart;
