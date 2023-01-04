import { setFilter } from '../reducers/filterReducer';
import { connect } from 'react-redux';

const Filter = ({ dispatch }) => {
  const handleChange = event => {
  dispatch(setFilter(event.target.value));
  };
  const style = {
  marginBottom: 10
  };
  
  return (
  <div style={style}>
  filter <input onChange={handleChange} />
  </div>
  );
  };
  
  export default connect()(Filter);