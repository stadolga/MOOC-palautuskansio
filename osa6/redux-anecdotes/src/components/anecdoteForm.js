import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';
import { showNotification } from '../reducers/notificationReducer';

const AnecdoteForm = (props) => {
const addAnecdote = async (event) => {
event.preventDefault();
const { value: content } = event.target.anecdote;
event.target.anecdote.value = '';
props.createAnecdote(content);
props.showNotification('added a new anecdote');
}
return (
  <>
  <h2>create new</h2>
  <form onSubmit={addAnecdote}>
  <div>
  <input name="anecdote" />
  </div>
  <button type="submit">create</button>
  </form>
  </>
  );
  };
  
  const mapDispatchToProps = {
  createAnecdote,
  showNotification,
  };
  
  export default connect(null, mapDispatchToProps)(AnecdoteForm);