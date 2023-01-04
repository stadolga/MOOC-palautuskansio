import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      var id = action.payload.id
      const anecdote = state.find(anecdote => anecdote.id === id);
      if (anecdote) {
        anecdote.votes += 1;
      }
    },
    newAnecdote: (state, action) => {
      console.log('Vote action received:', action, );
      state.push(action.payload);
      return state.sort((a,b) => b.votes-a.votes)
    },
    setAll: (state, action) => {
      console.log("called")
      console.log(action,state)
      return action.payload
    }
  }
});

export const { vote, newAnecdote, setAll } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAll(notes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newNote = await anecdoteService.createNew(content)
    dispatch(newAnecdote(newNote))
  }
}
export const addVote = id => {
  return async dispatch => {
    const newVote = await anecdoteService.newVote(id)
    dispatch(vote(newVote))
  }
}
