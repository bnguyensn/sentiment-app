import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import TextInput from '../components/pages/index/text-input';
import './index.css';
import Sentiment from '../components/pages/index/sentiment';
import useQuerySentiment from '../components/pages/index/useQuerySentiment';
import clsx from 'clsx';

const createSentimentComponent = (queryState, prevData) => {
  if (queryState.loading) {
    return (
      <Sentiment
        value="loading"
        confidence={null}
        prevConfidence={null}
        dominant={true}
      />
    );
  }

  if (queryState.error) {
    return (
      <Sentiment
        value="error"
        confidence={null}
        prevConfidence={null}
        dominant={true}
      />
    );
  }

  if (queryState.data) {
    const {
      positive: positiveConf,
      neutral: neutralConf,
      negative: negativeConf,
    } = queryState.data;

    const {
      positive: prevPositiveConf,
      neutral: prevNeutralConf,
      negative: prevNegativeConf,
    } = prevData;

    const dominantSentiment = queryState.meta?.dominantSentiment;

    return (
      <>
        <Sentiment
          value="positive"
          confidence={positiveConf}
          prevConfidence={prevPositiveConf}
          dominant={dominantSentiment === 'positive'}
        />
        <Sentiment
          value="neutral"
          confidence={neutralConf}
          prevConfidence={prevNeutralConf}
          dominant={dominantSentiment === 'neutral'}
        />
        <Sentiment
          value="negative"
          confidence={negativeConf}
          prevConfidence={prevNegativeConf}
          dominant={dominantSentiment === 'negative'}
        />
      </>
    );
  }

  return (
    <Sentiment
      value=""
      confidence={null}
      prevConfidence={null}
      dominant={true}
    />
  );
};

const IndexPage = () => {
  const [inputText, setInputText, queryState, prevData] = useQuerySentiment();

  const dominantSentiment = queryState.meta?.dominantSentiment;

  const sentimentComponent = createSentimentComponent(queryState, prevData);

  return (
    <Layout>
      <SEO title="Moody" />
      <div
        className={clsx(
          'index-ctn',
          dominantSentiment && `${dominantSentiment}`,
        )}
      >
        <TextInput inputText={inputText} setInputText={setInputText} />
        <div className="sentiments-ctn">{sentimentComponent}</div>
      </div>
    </Layout>
  );
};

export default IndexPage;
