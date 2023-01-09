import { configureStore } from "@reduxjs/toolkit";
import notification from "./reducers/notificationReducer";
import blogs from './reducers/blogReducer'
import blogForm from "./reducers/blogFormReducer";
import login from "./reducers/loginReducer";

const store = configureStore({
  reducer: {
    notifications: notification,
    blogs: blogs,
    blogForm: blogForm,
    login: login,
  },
});

export default store;
