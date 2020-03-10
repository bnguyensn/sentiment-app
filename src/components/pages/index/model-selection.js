import React from 'react';
import './model-selection.css';
import alvinWebp from '../../../images/alvin.webp';
import alvinJpg from '../../../images/alvin-small.jpg';
import facebookWebp from '../../../images/facebook.webp';
import facebookPng from '../../../images/facebook-small.png';

const getModelLogoSrc = selectedModel => {
  if (selectedModel === 'alvin') {
    return { webpSrc: alvinWebp, normalSrc: alvinJpg };
  }

  return {
    webpSrc: facebookWebp,
    normalSrc: facebookPng,
  };
};

const ModelSelection = ({ selectedModel, setSelectedModel }) => {
  const { webpSrc, normalSrc } = getModelLogoSrc(selectedModel);

  const handleSelectModel = e => {
    setSelectedModel(e.target.value);
  };

  return (
    <div className="model-selection-ctn">
      <div className="model-logo-ctn">
        <picture>
          <source srcSet={webpSrc} type="image/webp" />
          <img src={normalSrc} alt="Model logo" />
        </picture>
      </div>
      <div className="model-selection-input-ctn">
        <label className="model-selection-input-ctn-label" for="model-select">
          Choose a model:
        </label>
        <select
          className="model-selection-input-ctn-select"
          name="model"
          id="model-select"
          value={selectedModel}
          onChange={handleSelectModel}
        >
          <option value="facebook">Facebook</option>
          <option value="alvin">Alvin™</option>
        </select>
      </div>
    </div>
  );
};

export default ModelSelection;
