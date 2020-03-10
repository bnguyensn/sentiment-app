import React from 'react';
import './text-input.css';

const TextInput = ({ inputText, setInputText }) => {
  return (
    <div className="input-block-ctn">
      <div className="main-input-ctn wrapped">
        <label htmlFor="main-input">Type something here:</label>
        <input
          type="text"
          id="main-input"
          name="main-input"
          maxLength="255"
          placeholder="Max: 255 characters"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
        />
      </div>
    </div>
  );
};

export default TextInput;
