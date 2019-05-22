import { call, put, takeLatest } from 'redux-saga/effects';
import { makeAsyncCall } from './utils';
import API from './constants';
import { stockList, addStock, cancelLoading } from './actions';


function* getStockList() {
  try {
    const options = {
      url: API.getStockList,
      method: 'GET',
      Accept: 'application/json',
    };
    const result = yield call(makeAsyncCall, options);
    if (result.statusCode === 200) {
      yield put(stockList(result.body.slice(0, 100).map((s, i) => (
        // did not find for lazy/partial load or any pagination
        {
          id: i, value: s.symbol, label: s.symbol, price: s.price,
        }
      ))));
    }
  } catch (e) {
    console.log(e);
  }
}

function* getStockData({ company }) {
  try {
    const options = {
      url: API.getCompanyProfile(company),
      method: 'GET',
      Accept: 'application/json',
    };
    const result = yield call(makeAsyncCall, options);
    if (result.statusCode === 200) yield put(addStock({ ...result.body[company], name: company }));
  } catch (e) {
    yield put(cancelLoading());
    console.log(e);
  }
}

function* mySaga() {
  yield takeLatest('GET_STOCK_LIST', getStockList);
  yield takeLatest('GET_STOCK_DATA', getStockData);
}

export default mySaga;
