import { useEffect, useState } from 'react';
import useDebounce from './useDebounce';

const MAX_MESSAGE_LENGTH = 255;

const trimMessage = message =>
  message.length > 255 ? message.slice(0, MAX_MESSAGE_LENGTH - 1) : message;

const findDominantSentiment = sentiments => {
  const sortedSentiments = [...sentiments].sort((sentimentA, sentimentB) => {
    return sentimentB.confidence - sentimentA.confidence;
  });

  return sortedSentiments[0].value;
};

const querySentiment = async message => {
  const baseUrl = 'https://api.wit.ai/message';
  const publicToken = 'R6WFRGFPWN7DOYNVAX2Z53RWTZYKOK4D';

  const context = {
    reference_time: new Date(Date.now()).toISOString(),
  };

  const encodedMessage = encodeURIComponent(trimMessage(message));
  const encodedContext = encodeURIComponent(JSON.stringify(context));

  const url =
    `${baseUrl}?` +
    `q=${encodedMessage}` +
    `&context=${encodedContext}` +
    `&n=3`;
  const opts = {
    headers: {
      Authorization: `Bearer ${publicToken}`,
      Accept: 'application/json',
    },
  };

  const res = await fetch(url, opts);

  if (!res.ok) {
    throw new Error('Network error');
  }

  const data = await res.json();
  const sentiments = data.entities?.sentiment;

  if (!sentiments || (Array.isArray(sentiments) && sentiments.length < 3)) {
    throw new Error('Not enough sentiments received');
  }

  const sentimentConfidence = {};
  const sentimentMeta = {
    dominantSentiment: findDominantSentiment(sentiments),
  };
  sentiments.forEach(
    sentiment => (sentimentConfidence[sentiment.value] = sentiment.confidence),
  );

  return { sentimentConfidence, sentimentMeta };
};

const useQuerySentiment = () => {
  const [inputText, setInputText] = useState('');
  const [queryState, setQueryState] = useState({
    loading: false,
    error: undefined,
    data: undefined,
    meta: undefined,
  });
  const [prevData, setPrevData] = useState({
    positive: 0,
    neutral: 0,
    negative: 0,
  });

  const debouncedInputText = useDebounce(inputText, 500);

  useEffect(() => {
    if (
      debouncedInputText.length > 0 &&
      debouncedInputText.length <= MAX_MESSAGE_LENGTH
    ) {
      const executor = async () => {
        setQueryState({
          loading: true,
          error: undefined,
          data: undefined,
          meta: queryState.meta,
        });

        try {
          const { sentimentConfidence, sentimentMeta } = await querySentiment(
            debouncedInputText,
          );

          if (queryState.data) setPrevData(queryState.data);

          setQueryState({
            loading: false,
            error: undefined,
            data: sentimentConfidence,
            meta: sentimentMeta,
          });
        } catch (err) {
          setQueryState({
            loading: false,
            error: err.message,
            data: undefined,
            meta: undefined,
          });
        }
      };

      executor();
    } else {
      setQueryState({
        loading: false,
        error: undefined,
        data: undefined,
        meta: undefined,
      });

      setPrevData({
        positive: 0,
        neutral: 0,
        negative: 0,
      });
    }
  }, [debouncedInputText]);

  return [inputText, setInputText, queryState, prevData];
};

export default useQuerySentiment;
