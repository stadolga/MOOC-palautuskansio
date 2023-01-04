import {useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm= () => {
    const dispatch = useDispatch()
    const addAnecdote = (event) => {
        event.preventDefault()
        const { value: content } = event.target.anecdote;
        event.target.anecdote.value = ''
        console.log(content)
        dispatch(showNotification("added a new anecdote"))
        dispatch(newAnecdote(content))
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