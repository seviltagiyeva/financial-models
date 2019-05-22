import React from 'react';
import PropTypes from 'prop-types';
import './App.sass';
import { connect } from 'react-redux';
import Select from 'react-select';
import {
  getStockData, deleteStock, getStcokList, setSelectedStocks,
} from '../../actions';
import Table from '../table/Table';

class App extends React.Component {
  componentDidMount() {
    const { getOptions } = this.props;
    getOptions();
  }

  handleChange = (newOptions) => {
    const {
      setSelectedOption, selectedOptions, getData, deleteData,
    } = this.props;
    const selectedStocks = selectedOptions.map(option => option.value);
    const newStocks = newOptions.map(option => option.value);
    if (newOptions.length > selectedOptions.length) {
      const newOption = newOptions.find(option => (
        selectedStocks.indexOf(option.value) === -1
      )).value;
      getData(newOption);
    } else {
      const deletedOptions = selectedOptions.filter(option => (
        newStocks.indexOf(option.value) === -1
      )).map(d => d.value);
      deleteData(deletedOptions);
    }
    setSelectedOption(newOptions);
  }

  render() {
    const { stockList, selectedOptions } = this.props;
    return (
      <div className="App">
        <div className="select-wrapper">
          <h3>Stock Prices List</h3>
          <Select
            className="basic-multi-select"
            classNamePrefix="select"
            isMulti
            options={stockList}
            onChange={this.handleChange}
            value={selectedOptions}
          />
        </div>
        <Table />
      </div>
    );
  }
}

const mapStateToProps = store => ({
  data: store.data,
  stockList: store.stockList,
  selectedOptions: store.selectedOptions,
});

const mapDispatchToProps = dispatch => ({
  getData: company => dispatch(getStockData(company)),
  deleteData: companies => dispatch(deleteStock(companies)),
  getOptions: () => dispatch(getStcokList()),
  setSelectedOption: optios => dispatch(setSelectedStocks(optios)),
});

App.propTypes = {
  selectedOptions: PropTypes.arrayOf(PropTypes.object),
  stockList: PropTypes.arrayOf(PropTypes.object),
  getOptions: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  deleteData: PropTypes.func.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

App.defaultProps = {
  selectedOptions: [],
  stockList: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
