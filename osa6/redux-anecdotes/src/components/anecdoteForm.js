import {useDispatch } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addAnecdote = async(event) => {
        event.preventDefault()
        const { value: content } = event.target.anecdote;
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))

        dispatch(showNotification("added a new anecdote"))
      }

    return(
        <>
    <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
      </>
    )
}

export default AnecdoteForm