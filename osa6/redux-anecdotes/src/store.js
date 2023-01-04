import { configureStore } from '@reduxjs/toolkit'
import anecdote, { initializeNotes } from './reducers/anecdoteReducer';
import notification from './reducers/notificationReducer'
import filter from './reducers/filterReducer'
import anecdoteService from './services/anecdoteService'

const store = configureStore({
  reducer: {
    anecdotes: anecdote,
    notifications: notification,
    filter: filter
  }})

export default store