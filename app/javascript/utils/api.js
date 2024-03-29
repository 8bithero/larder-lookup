export const fetchData = (endpoint, filters = null, successCallback) => {
  let url = `/api/v1/${endpoint}/index`;

  if (filters) {
    url = generateQueryStringWithFilters(url, filters);
  }

  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('Network response was not ok.');
    })
    .then((res) => successCallback(res))
    .catch((err) => message.error('Error: ' + err));
};

const generateQueryStringWithFilters = (baseUrl, filters) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value && value.length) {
      params.append(`filters[${key}]`, value.join(','));
    }
  });
  return `${baseUrl}?${params.toString()}`;
};
