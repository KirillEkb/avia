export const changeTabs = (payload) => {
  return {
    type: 'CHANGE_TABS',
    payload,
  };
};

export const changeFilter = (payload) => {
  return {
    type: 'CHANGE_FILTER',
    payload,
  };
};
