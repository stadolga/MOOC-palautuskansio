import { createSlice } from '@reduxjs/toolkit';

const blogFormSlice = createSlice({
  name: 'blogForm',
  initialState: {
    newAuthor: '',
    newTitle: '',
    newUrl: '',
  },
  reducers: {
    setNewAuthor: (state, action) => {
      state.newAuthor = action.payload;
    },
    setNewTitle: (state, action) => {
      state.newTitle = action.payload;
    },
    setNewUrl: (state, action) => {
      state.newUrl = action.payload;
    },
  },
});

export const { setNewAuthor, setNewTitle, setNewUrl } = blogFormSlice.actions;
export default blogFormSlice.reducer;
