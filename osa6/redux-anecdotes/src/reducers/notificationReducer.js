import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notifications',
    initialState: null,
    reducers: {
      showNotification: (state, action) => {
        return state = action.payload
      },
      deleteNotification: (state, action) => {
        return state = null
      }
    }
  });

export const {showNotification, deleteNotification} = notificationSlice.actions
export default notificationSlice.reducer