import React, { useEffect, useState } from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import './index.css';
import TopicSelection from '../components/pages/news/topic-selection';
import Chart from '../components/pages/news/chart';

const DATA_STATES = {
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

const NewsAnalysisPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('stock-market');
  const [dataState, setDataState] = useState(DATA_STATES.NO_DATA);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (dataState === DATA_STATES.NO_DATA && data === null) {
      getNewsSentimentData(selectedTopic, setDataState, setData);
    }
  }, [dataState, setDataState, data, setData, selectedTopic]);

  return (
    <Layout>
      <SEO title="News Sentiment" />
      <div className={'index-ctn'}>
        <div className="index-title-block">
          <h1 className="index-title">MOODY</h1>
          <h2 className="index-subtitle">NEWS SENTIMENT</h2>
        </div>
        <TopicSelection
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
        />
        <Chart data={data} />
      </div>
    </Layout>
  );
};

export default NewsAnalysisPage;
