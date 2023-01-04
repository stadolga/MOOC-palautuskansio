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

export const setNotification = (message, time) => {
  console.log(time, "!!!")
  return dispatch => {
    dispatch(showNotification(message))
    console.log("here")
    const timeoutId = setTimeout(() => {
      dispatch(deleteNotification());
    }, time);
    return () => clearTimeout(timeoutId);
  }
}

export default notificationSlice.reducer