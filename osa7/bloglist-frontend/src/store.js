import { configureStore } from '@reduxjs/toolkit'
import notification from './reducers/notificationReducer'

const store = configureStore({
  reducer: {
    notifications: notification
  }})

export default store