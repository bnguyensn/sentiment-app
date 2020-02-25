import { useState } from 'react';
import useConstant from 'use-constant';
import AwesomeDebouncePromise from 'awesome-debounce-promise';
import { useAsync } from 'react-async-hook';

const querySentiment = async message => {
  const baseUrl = 'https://api.wit.ai/message';
  const publicToken = 'R6WFRGFPWN7DOYNVAX2Z53RWTZYKOK4D';

  const context = {
    reference_time: new Date(Date.now()).toISOString(),
  };

  const encodedMessage = encodeURIComponent(message);
  const encodedContext = encodeURIComponent(JSON.stringify(context));

  const url = `${baseUrl}?q=${encodedMessage}&context=${encodedContext}`;
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

  return res.json();
};

const useQuerySentiment = () => {
  const [inputText, setInputText] = useState('');

  const debouncedQuery = useConstant(() =>
    AwesomeDebouncePromise(querySentiment, 1000),
  );

  const query = useAsync(async () => {
    if (inputText.length === 0 || inputText.length > 255) {
      return undefined;
    } else {
      return debouncedQuery(inputText);
    }
  }, [inputText]);

  return {
    inputText,
    setInputText,
    query,
  };
};

export default useQuerySentiment;
