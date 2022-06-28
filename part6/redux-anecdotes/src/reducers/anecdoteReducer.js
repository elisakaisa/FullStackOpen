import { createSlice } from '@reduxjs/toolkit'

// internal imports
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateVoteAnecdote(state, action) {
      const votedAnecdote = action.payload;
      const { id } = votedAnecdote;
      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : votedAnecdote
      )
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { updateVoteAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    const anecdoteToVote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const votedAnecdote = await anecdoteService.updateVotes(anecdoteToVote)
    dispatch(updateVoteAnecdote(votedAnecdote))
  }
}

export default anecdoteSlice.reducer