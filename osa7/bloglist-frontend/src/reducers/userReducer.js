import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/userService';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers: (state, action) => action.payload,
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;

export const initializeUsers = () => async (dispatch) => {
  const blogs = await userService.getAll();
  dispatch(setUsers(blogs));
};
