import { useState, useEffect } from 'react';
import fetch from 'node-fetch';

export const IDLE_STATUS = 'idle';
export const FETCHING_STATUS = 'fetching';
export const FETCHED_STATUS = 'fetched';

const useFetch = ({ url }: { url?: string } = {}) => {
  const [status, setStatus] = useState(IDLE_STATUS);
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;

    const fetchUrl = async () => {
      setStatus(FETCHING_STATUS);

      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setStatus(FETCHED_STATUS);
    };

    fetchUrl();
  }, [url]);

  return { status, data };
};

export default useFetch;
