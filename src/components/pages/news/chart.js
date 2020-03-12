import React, { useEffect, useState } from 'react';
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

const CHART_WIDTH = 350;
const CHART_HEIGHT = 350;

export const DATA_STATES = {
  NO_DATA: 0,
  LOADING_DATA: 1,
  DATA_ERROR: 2,
  DATA_LOADED: 3,
};

const getNewsSentimentData = async (topic, setDataState, setData) => {
  const baseUrl =
    'https://europe-west1-bnguyensn-2468.cloudfunctions.net/moody-app-get-news-sentiment';

  const url = `${baseUrl}?topic=${topic}`;

  try {
    setDataState(DATA_STATES.LOADING_DATA);
    setData(null);
    const res = await fetch(url);

    if (!res.ok) {
      setDataState(DATA_STATES.DATA_ERROR);
      setData(null);
    }

    const data = await res.json();

    setDataState(DATA_STATES.DATA_LOADED);
    setData(data.data);
  } catch (err) {
    console.error(err);

    setDataState(DATA_STATES.DATA_ERROR);
    setData(null);
  }
};

const dateStrToDate = dateStr => {
  const dateStrParts = dateStr.split('-');

  return new Date(dateStrParts[0], dateStrParts[1] - 1, dateStrParts[2]);
};

const Chart = ({ selectedTopic, dataState, setDataState, data, setData }) => {
  useEffect(() => {
    if (dataState === DATA_STATES.NO_DATA && data === null) {
      getNewsSentimentData(selectedTopic, setDataState, setData);
    }
  }, [dataState, setDataState, data, setData, selectedTopic]);

  if (dataState === DATA_STATES.LOADING_DATA) {
    return (
      <div className="chart-ctn">
        <div className="chart-block">Loading data...</div>
      </div>
    );
  }

  if (dataState === DATA_STATES.DATA_ERROR) {
    return (
      <div className="chart-ctn">
        <div className="chart-block">Error loading error...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="chart-ctn">
        <div className="chart-block">Nothing to see here...yet</div>
      </div>
    );
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
    return dateA - dateB;
  });

  return (
    <div className="chart-ctn">
      <LineChart width={CHART_WIDTH} height={CHART_HEIGHT} data={processedData}>
        <CartesianGrid />
        <XAxis dataKey="dateStr" />
        <YAxis dataKey="sentiment" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sentiment" stroke="#1a237e" />
      </LineChart>
    </div>
  );
};

export default Chart;
