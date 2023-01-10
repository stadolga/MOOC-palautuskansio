import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogService';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    addBlog: (state, action) => {
      const content = action.payload;
      state.push(content);
    },
    setBlogs: (state, action) => action.payload.sort((a, b) => b.likes - a.likes),
    removeBlog: (state, action) => {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
    updateBlog: (state, action) => {
      const { id } = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        likes: noteToChange.likes + 1,
      };
      return state.map((note) => (note.id !== id ? note : changedNote)).sort((a, b) => b.likes - a.likes);
    },
    addComment: (state, action) => {
      const comm = action.payload.retObj;
      const { id } = action.payload;
      const blog = state.find((n) => id === n.id);
      blog.comment.push(comm);
    },
  },
});

export const {
  addBlog, setBlogs, removeBlog, updateBlog, addComment,
} = blogSlice.actions;

export const initializeBlogs = () => async (dispatch) => {
  const blogs = await blogService.getAll();
  dispatch(setBlogs(blogs));
};

export const newBlog = (blogObject) => async (dispatch) => {
  const returnedBlog = await blogService.create(blogObject);
  dispatch(addBlog(returnedBlog));
};

export const removeBlogThunk = (id) => async (dispatch) => {
  await blogService.deleteBlog(id);
  dispatch(removeBlog(id));
};

export const addCommentsThunk = (id, comment) => {
  const commentObject = {
    comment,
    id,
  };
  return async (dispatch) => {
    const retObj = await blogService.addComments(id, commentObject);
    dispatch(addComment({ retObj: retObj.data, id }));
  };
};

  export const updateBlogThunk = (userObject, id) => async (dispatch) => {
    try {
      const returnedObject = await blogService.put(userObject, id);
      dispatch(updateBlog(returnedObject.data));
    } catch (error) {
  }
};

export default blogSlice.reducer;
