import React from 'react';
import './description.css';

const Description = () => {
  return (
    <div className="description-block-ctn">
      <div className="description-text-ctn">
        <h3>Summary</h3>
        <p>
          The top 50 daily news headlines for a given topic are run through the
          sentiment model. The results are plotted against a line chart.
        </p>
      </div>
    </div>
  );
};

export default Description;
