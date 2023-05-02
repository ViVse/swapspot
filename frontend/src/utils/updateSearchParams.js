const updateSearchParams = (searchParams, newValue) => {
  const searchObj = {};

  searchParams.forEach((value, key) => {
    searchObj[key] = value;
  });

  return { ...searchObj, ...newValue };
};

export default updateSearchParams;
