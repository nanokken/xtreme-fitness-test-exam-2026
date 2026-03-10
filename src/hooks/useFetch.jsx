import { useState, useEffect, useCallback, useRef } from 'react';

const BASE_URL = 'http://localhost:3042';

export function useFetch(endpoint, options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const optionsRef = useRef(options);
  const hasFetched = useRef(false);

  const { immediate = true } = options;

  const fetchData = useCallback(async (overrideOptions = {}) => {
    setLoading(true);
    setError(null);

    const { immediate: _, ...fetchOptions } = optionsRef.current;

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
          ...overrideOptions.headers,
        },
        ...fetchOptions,
        ...overrideOptions,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    if (immediate && !hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, [immediate, fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// For one-off requests without the hook
export async function fetchAPI(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
