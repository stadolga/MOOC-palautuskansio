import AnecdoteList from './components/anecdoteList'
import AnecdoteForm from './components/anecdoteForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initializeNotes } from './reducers/anecdoteReducer'

const App = () => {
const dispatch = useDispatch()
useEffect(() => {
    dispatch(initializeNotes()) 
  }, [dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification/>
      <Filter/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App