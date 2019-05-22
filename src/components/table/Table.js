import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MaterialIcon from 'material-icons-react';
import './styles.sass';

const Table = (props) => {
  const { data, loading } = props;
  const renderBody = () => data.map((d, i) => (
    <tr key={i}>
      <td>
        {d.name}
      </td>
      <td>
        {d.Price}
      </td>
      <td>
        {d.ChangesPerc}
      </td>
      <td>
        {d.industry}
      </td>
      <td>
        {d.sector}
      </td>
      <td>
        <img src={d.image} alt={d.name} />
      </td>
      <td>
        <a target="_blank" rel="noopener noreferrer" href={d.website}>
          <MaterialIcon icon="language" size={20} color="#4c99e0" />
        </a>
      </td>
    </tr>
  ));

  const emptyContent = () => <tr><td colSpan={7}>No data</td></tr>;

  return (
    <div>
      <table style={{ opacity: loading ? '.3' : '1' }}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th> Price </th>
            <th>Changes Percentage</th>
            <th>Industry</th>
            <th>Sector</th>
            <th>Image</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          { data.length ? renderBody() : emptyContent()}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = store => ({
  loading: store.loading,
  data: store.data,
});


Table.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
};

Table.defaultProps = {
  loading: false,
  data: [],
};

export default connect(mapStateToProps)(Table);
