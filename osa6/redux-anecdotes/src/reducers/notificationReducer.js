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

let timeoutId = null;
let notificationDisplayed = false;

export const {showNotification, deleteNotification} = notificationSlice.actions

export const setNotification = (message, time) => {
  return dispatch => {
    if (notificationDisplayed) {
      clearTimeout(timeoutId);
    }

    dispatch(showNotification(message));
    notificationDisplayed = true;

    timeoutId = setTimeout(() => {
      dispatch(deleteNotification());
      notificationDisplayed = false;
    }, time);
  }
}

export default notificationSlice.reducer