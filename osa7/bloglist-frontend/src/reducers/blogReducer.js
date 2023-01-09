import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogService'

const blogSlice = createSlice({
    name: 'blog',
    initialState: [],
    reducers: {
        addBlog: (state,action) => {
            const content = action.payload
            state.push(content)
        },
        setBlogs: (state,action) => {
            return action.payload.sort((a, b) => b.likes - a.likes)
        },
        removeBlog: (state, action) => {
            const id = action.payload;
            return state.filter((blog) => blog.id !== id);
        },
        updateBlog: (state,action) => {
          const id = action.payload.id
          const noteToChange = state.find(n => n.id === id)
          const changedNote = { 
            ...noteToChange, 
        likes: noteToChange.likes+1 
      }
      return state.map(note =>
        note.id !== id ? note : changedNote 
      ).sort((a, b) => b.likes - a.likes)
        }
    }
})

export const {addBlog,setBlogs, removeBlog, updateBlog} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
      const blogs = await blogService.getAll()
      dispatch(setBlogs(blogs))
    }
  }

export const newBlog = (blogObject) => {
    return async dispatch => {
      const returnedBlog = await blogService.create(blogObject)
      dispatch(addBlog(returnedBlog))
    }
  }

export const removeBlogThunk = (id) => {
    return async (dispatch) => {
      await blogService.deleteBlog(id);
      dispatch(removeBlog(id));
    };
  };

  export const updateBlogThunk = (userObject, id) => {
    return async (dispatch) => {
      try {
        const returnedObject = await blogService.put(userObject, id);
        console.log(returnedObject.data)
        dispatch(updateBlog(returnedObject.data))
      } catch (error) {
        console.error(error);
      }
    };
  };
  

export default blogSlice.reducer
