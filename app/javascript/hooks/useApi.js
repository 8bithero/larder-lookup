import { useState, useCallback } from 'react';

function useApi() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQueryStringWithFilters = (baseUrl, filters) => {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length) {
        values.forEach((value) => {
          params.append(`${key}[]`, value);
        });
      } else {
        params.append(`${key}`, values);
      }
    });

    return `${baseUrl}?${params.toString()}`;
  };

  const buildPayload = (key, array) => {
    return array.length > 0 ? { [key]: array.map((item) => item.id) } : {};
  };

  const fetchData = useCallback((endpoint, filters = null, successCallback) => {
    let url = `/api/v1/${endpoint}/index`;

    if (filters) {
      url = generateQueryStringWithFilters(url, filters);
    }

    setIsLoading(true);
    setError(null);

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok.');
        }
        return res.json();
      })
      .then(successCallback)
      .catch((err) => {
        console.error('Error:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { buildPayload, fetchData, isLoading, error };
}

export default useApi;
