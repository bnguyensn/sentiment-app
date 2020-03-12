import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import './news.css';
import TopicSelection from '../components/pages/news/topic-selection';
import Chart, { DATA_STATES } from '../components/pages/news/chart';
import Description from '../components/pages/news/description';
import LinkButton from '../components/common/link-button';

const NewsAnalysisPage = () => {
  const [selectedTopic, setSelectedTopic] = useState('stock-market');
  const [dataState, setDataState] = useState(DATA_STATES.NO_DATA);
  const [data, setData] = useState(null);

  return (
    <Layout>
      <SEO title="News Sentiment" />
      <div className={'news-ctn'}>
        <LinkButton to="/">S</LinkButton>
        <div className="news-title-block">
          <h1 className="news-title">MOODY</h1>
          <h2 className="news-subtitle">NEWS SENTIMENT</h2>
        </div>
        <TopicSelection
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          setData={setData}
          setDataState={setDataState}
        />
        <Chart
          selectedTopic={selectedTopic}
          dataState={dataState}
          setDataState={setDataState}
          data={data}
          setData={setData}
        />
        <Description />
      </div>
    </Layout>
  );
};

export default NewsAnalysisPage;
