import React from 'react';
import './topic-selection.css';
import { DATA_STATES } from './chart';

const TopicSelection = ({
  selectedTopic,
  setSelectedTopic,
  setData,
  dataState,
  setDataState,
}) => {
  const handleSelectTopic = e => {
    setSelectedTopic(e.target.value);
    setData(null);
    setDataState(DATA_STATES.NO_DATA);
  };

  return (
    <div className="topic-selection-ctn">
      <div className="topic-selection-input-ctn">
        <label
          className="topic-selection-input-ctn-label"
          htmlFor="topic-select"
        >
          Choose a topic:
        </label>
        <select
          className="topic-selection-input-ctn-select"
          name="topic"
          id="topic-select"
          value={selectedTopic}
          onChange={handleSelectTopic}
          disabled={dataState === DATA_STATES.LOADING_DATA}
        >
          <option value="stock-market">Stock market</option>
          <option value="tech">Technology</option>
          <option value="entertainment">Entertainment</option>
          <option value="premier-league">Premier League</option>
          <option value="boris-johnson">Boris Johnson</option>
          <option value="pwc">PwC</option>
        </select>
      </div>
    </div>
  );
};

export default TopicSelection;
