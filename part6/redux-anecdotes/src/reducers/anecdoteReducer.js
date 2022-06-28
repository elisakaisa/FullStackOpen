import { createSlice } from '@reduxjs/toolkit'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote2(state, action) {
      state.push(action.payload)
    },
    voteAnecdote2(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anecdote => anecdote.id === id)
      const votedAnecdote = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => (anecdote.id === votedAnecdote.id ? votedAnecdote : anecdote))
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      console.log('reducer', action.payload)
      return action.payload
    }
  }
})

export const { createAnecdote2, voteAnecdote2, appendAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer