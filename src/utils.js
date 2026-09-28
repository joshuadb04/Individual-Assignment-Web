const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const json = await response.json();

  if (!response.ok && json.message) {
    throw new Error(json.message);
  }

  if (!response.ok) {
    throw new Error("Error found: " + response.statusText);
  }

  return json;
};

export { fetchData };
