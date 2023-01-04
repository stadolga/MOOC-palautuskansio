import anecdote from './reducers/anecdoteReducer'
import notification from './reducers/notificationReducer'
import filter from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'


const store = configureStore({
  reducer: {
    anecdotes: anecdote,
    notifications: notification,
    filter: filter
  }})

export default store