const params = {
  queryValue: (key: string) => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get(key);
  },
};

export default params;
