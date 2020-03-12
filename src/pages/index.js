import React, { useState } from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import TextInput from '../components/pages/index/text-input';
import Sentiment from '../components/pages/index/sentiment';
import useQuerySentiment from '../components/pages/index/useQuerySentiment';
import ModelSelection from '../components/pages/index/model-selection';
import './index.css';
import Description from '../components/pages/index/description';
import LinkButton from '../components/common/link-button';

const createSentimentComponent = (
  queryState,
  prevData,
  selectedModel,
  inputText,
) => {
  if (!inputText) {
    return (
      <Sentiment
        value=""
        confidence={null}
        prevConfidence={null}
        dominant={true}
      />
    );
  }

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
    // Depending on the selected model, data can be of different shapes

    if (selectedModel === 'facebook') {
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
            confidenceIsPercentage
          />
          <Sentiment
            value="neutral"
            confidence={neutralConf}
            prevConfidence={prevNeutralConf}
            dominant={dominantSentiment === 'neutral'}
            confidenceIsPercentage
          />
          <Sentiment
            value="negative"
            confidence={negativeConf}
            prevConfidence={prevNegativeConf}
            dominant={dominantSentiment === 'negative'}
            confidenceIsPercentage
          />
        </>
      );
    } else if (selectedModel === 'alvin') {
      const sentimentScore = queryState.data;

      const sentimentValue =
        sentimentScore > 2
          ? 'positive'
          : sentimentScore < -2
          ? 'negative'
          : 'neutral';

      return (
        <Sentiment
          value={sentimentValue}
          confidence={sentimentScore}
          prevConfidence={prevData}
          dominant
        />
      );
    }
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
  const [selectedModel, setSelectedModel] = useState('facebook');
  const [inputText, setInputText, queryState, prevData] = useQuerySentiment(
    selectedModel,
  );

  // const dominantSentiment = queryState.meta?.dominantSentiment;

  const sentimentComponent = createSentimentComponent(
    queryState,
    prevData,
    selectedModel,
    inputText,
  );

  return (
    <Layout>
      <SEO title="Sentence Sentiment" />
      <div className={'index-ctn'}>
        <LinkButton to="/news">N</LinkButton>
        <div className="index-title-block">
          <h1 className="index-title">MOODY</h1>
          <h2 className="index-subtitle">SENTENCE SENTIMENT</h2>
        </div>
        <ModelSelection
          selectedModel={selectedModel}
          setSelectedModel={setSelectedModel}
          setInputText={setInputText}
        />
        <TextInput inputText={inputText} setInputText={setInputText} />
        <div className="sentiments-ctn">{sentimentComponent}</div>
        <Description selectedModel={selectedModel} />
      </div>
    </Layout>
  );
};

export default IndexPage;
