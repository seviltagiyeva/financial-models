import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';
import { loadState, saveState } from './localStorage';

function stock(state = {
  data: [],
  loading: false,
  newRow: false,
  selectedOptions: [],
}, action) {
  switch (action.type) {
    case 'GET_STOCK_DATA':
      return {
        ...state,
        loading: true,
      };
    case 'CANCEL_LOADING':
      return {
        ...state,
        loading: false,
      };
    case 'ADD_STOCK':
      return {
        ...state,
        data: state.data.concat(action.payload),
        loading: false,
      };
    case 'DELETE_STOCK':
      return {
        ...state,
        data: state.data.filter(d => action.companies.indexOf(d.name) === -1),
      };
    case 'STOCK_LIST':
      return {
        ...state,
        stockList: action.payload,
      };
    case 'SET_SELECTED_OPTIONS':
      return {
        ...state,
        selectedOptions: action.stocks,
      };
    default:
      return state;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composedEnhancers = compose(
  applyMiddleware(sagaMiddleware),
);

const persistStore = loadState();


const store = createStore(
  stock,
  persistStore,
  composedEnhancers,
);

store.subscribe(() => {
  saveState({
    data: store.getState().data,
    stockList: store.getState().stockList,
    selectedOptions: store.getState().selectedOptions,
  });
});

sagaMiddleware.run(mySaga);

export default store;
