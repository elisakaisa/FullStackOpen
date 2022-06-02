import React from 'react';
import { useState } from 'react'

const Randomizer = (props) => {
  const rdm_number = Math.round(Math.random()*props.len)-1
  let array = [0]
  array.concat(rdm_number)
  return (
    <button onClick={() => props.function(rdm_number)}>
      {props.text}
    </button>
  )
}

const Votecounter = (props) => {
  const copy = [...props.vote]
  copy[props.selected] += 1

  return(
    <button onClick={() => props.setvote(copy)}>
      {props.txt}
    </button>
  )
}

const Maxvotes = (props) => {
  const highestvotes = Math.max(...props.vote)
  const index = props.vote.indexOf(highestvotes)
  const topanecdote = props.anecdotes[index]

  return (
    <div>
      <p>{topanecdote}</p>
      <p>has {highestvotes} votes</p>
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const number_anecdotes = anecdotes.length

  const next_anecdote = "next anecdote"
  const txt_vote = "vote"

  const title_oftheday = "Anecdote of the day"
  const title_mostvotes = "Note with the most votes"
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0))

  return (
    <div>
      <Header text={title_oftheday} />
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <p>
        <Votecounter selected={selected} vote={vote} setvote={setVote} txt={txt_vote} />
        <Randomizer function={setSelected} text={next_anecdote} len={number_anecdotes} />
      </p>
      <Header text={title_mostvotes} />
      <Maxvotes vote={vote} anecdotes={anecdotes} />
    </div>
  )
}

export default App