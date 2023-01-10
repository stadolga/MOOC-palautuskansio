import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: null,
  reducers: {
    showNotification: (state, action) => (state = action.payload),
    deleteNotification: (state, action) => (state = null),
  },
});

let timeoutId = null;
let notificationDisplayed = false;

export const { showNotification, deleteNotification } = notificationSlice.actions;

export const setNotification = (message, time) => (dispatch) => {
  if (notificationDisplayed) {
    clearTimeout(timeoutId);
  }
  console.log(message, time, '!!!');

  dispatch(showNotification(message));
  notificationDisplayed = true;

  timeoutId = setTimeout(() => {
    dispatch(deleteNotification());
    notificationDisplayed = false;
  }, time);
};
export default notificationSlice.reducer;
