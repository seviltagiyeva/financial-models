const baseUrl = 'https://cors-anywhere.herokuapp.com/https://financialmodelingprep.com/api/';

const API = {
  getStockList: `${baseUrl}stock/real-time/all?datatype=json`,
  getCompanyProfile: company => `${baseUrl}company/profile/${company}?datatype=json`,
};

export default API;
