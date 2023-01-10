import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: 'Guest',
    password: 'password',
    user: '',
  },
  reducers: {
    setUser: (state, action) => {
      const user = action.payload;
      state.user = user;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { setUser, setPassword, setUsername } = loginSlice.actions;
