import React from 'react';
import Layout from '../components/layout/layout';
import SEO from '../components/layout/seo';
import TextInput from '../components/pages/index/text-input';
import './index.css';
import Sentiment from '../components/pages/index/sentiment';
import useQuerySentiment from '../components/pages/index/useQuerySentiment';

const parseSentimentQuery = query => {
  if (query.loading) return 'loading';

  if (query.error) return 'error';

  if (query.result) {
    console.dir(query.result);

    const sentiment = query.result.entities?.sentiment;

    if (sentiment) {
      return sentiment[0].value;
    }

    return 'unknown';
  }

  return '';
};

const IndexPage = () => {
  const { inputText, setInputText, query } = useQuerySentiment();

  const sentimentText = parseSentimentQuery(query);
  console.log(sentimentText);

  return (
    <Layout>
      <SEO title="Moody" />
      <div className="index-ctn">
        <TextInput inputText={inputText} setInputText={setInputText} />
        <Sentiment sentimentText={sentimentText} />
      </div>
    </Layout>
  );
};

export default IndexPage;
