import { configureStore } from '@reduxjs/toolkit';
import notification from './reducers/notificationReducer';
import blogs from './reducers/blogReducer';
import blogForm from './reducers/blogFormReducer';
import login from './reducers/loginReducer';
import users from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notifications: notification,
    blogs,
    blogForm,
    login,
    users,
  },
});

export default store;
