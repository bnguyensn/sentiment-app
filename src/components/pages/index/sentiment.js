import React from 'react';
import './sentiment.css';

const Sentiment = ({ sentimentText }) => {
  let sentimentEmoji;

  switch (sentimentText) {
    case 'positive':
      sentimentEmoji = '😄';
      break;
    case 'neutral':
      sentimentEmoji = '😐';
      break;
    case 'negative':
      sentimentEmoji = '😠';
      break;
    case 'loading':
      sentimentEmoji = '🤔';
      break;
    case 'unknown':
      sentimentEmoji = '😕';
      break;
    default:
      sentimentEmoji = '😶';
  }

  return (
    <div className="sentiment-ctn">
      <div className="sentiment-emoji">{sentimentEmoji}</div>
    </div>
  );
};

export default Sentiment;
