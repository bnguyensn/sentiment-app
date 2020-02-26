import React from 'react';
import './sentiment.css';
import clsx from 'clsx';

const Sentiment = ({ value, confidence, prevConfidence, dominant }) => {
  let sentimentEmoji;

  switch (value) {
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

  const confidenceChange =
    confidence !== null && prevConfidence !== null
      ? (confidence - prevConfidence) * 100
      : null;

  return (
    <div className="sentiment-ctn">
      <div className={clsx('sentiment-emoji', !dominant && 'small')}>
        {sentimentEmoji}
      </div>
      {confidence !== null && (
        <>
          <div className="sentiment-confidence">
            {`${Number.parseFloat(`${confidence * 100}`).toFixed(2)}%`}
          </div>
          {confidenceChange !== null && (
            <div
              className={clsx(
                'sentiment-confidence-change',
                confidenceChange > 0 ? 'green' : 'red',
              )}
            >
              {`${confidenceChange >= 0 ? '+' : ''}${Number.parseFloat(
                `${confidenceChange}`,
              ).toFixed(2)}%`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sentiment;
