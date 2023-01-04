import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification, showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch()
    const filteredAnecdotes = anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const newVote = (anecdote) => {
      dispatch(addVote(anecdote.id))
      dispatch(setNotification(`You voted for '${anecdote.content}'!`, 5000))
    }
    return(
    <>
        {filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => newVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
    )
}

export default AnecdoteList