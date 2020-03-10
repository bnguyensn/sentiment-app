import React from 'react';
import './description.css';
import descriptionData from './description.json';

const Description = ({ selectedModel }) => {
  const { summary, training } = descriptionData[selectedModel];

  return (
    <div className="description-block-ctn">
      <div className="description-text-ctn">
        <h3>Summary</h3>
        <p>{summary}</p>
        <h3>Training</h3>
        <p>{training}</p>
      </div>
    </div>
  );
};

export default Description;
