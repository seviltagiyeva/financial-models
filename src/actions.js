const getStockData = company => (
  { type: 'GET_STOCK_DATA', company }
);

const addStock = payload => (
  { type: 'ADD_STOCK', payload }
);

const deleteStock = companies => (
  { type: 'DELETE_STOCK', companies }
);

const getStcokList = () => (
  { type: 'GET_STOCK_LIST' }
);

const stockList = payload => (
  { type: 'STOCK_LIST', payload }
);

const setSelectedStocks = stocks => (
  { type: 'SET_SELECTED_OPTIONS', stocks }
);

const cancelLoading = () => (
  { type: 'CANCEL_LOADING' }
);

export {
  getStockData,
  addStock,
  cancelLoading,
  getStcokList,
  stockList,
  setSelectedStocks,
  deleteStock,
};
