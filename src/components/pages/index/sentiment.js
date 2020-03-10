import React from 'react';
import './sentiment.css';
import clsx from 'clsx';

const Sentiment = ({
  value,
  confidence,
  prevConfidence,
  dominant,
  confidenceIsPercentage,
}) => {
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

  const percentageModifier = confidenceIsPercentage ? 100 : 1;
  const percentageSuffix = confidenceIsPercentage ? '%' : '';

  const confidenceChange =
    confidence !== null &&
    prevConfidence !== null &&
    !Number.isNaN(confidence) &&
    !Number.isNaN(prevConfidence) &&
    typeof prevConfidence !== 'object'
      ? (confidence - prevConfidence) * percentageModifier
      : null;

  return (
    <div className="sentiment-ctn">
      <div className={clsx('sentiment-emoji', !dominant && 'small')}>
        {sentimentEmoji}
      </div>
      {confidence !== null && (
        <>
          <div className="sentiment-confidence">
            {`${Number.parseFloat(`${confidence * percentageModifier}`).toFixed(
              2,
            )}${percentageSuffix}`}
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
              ).toFixed(2)}${percentageSuffix}`}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Sentiment;
