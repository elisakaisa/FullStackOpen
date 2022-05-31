import React from 'react';
import { useState } from 'react'

/*---------------*/
const Header = (props) => {
  return (
    <div><h1>{props.text}</h1></div>
  )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td> 
      <td>{props.value}</td>
    </tr>
  )
}

/*----- Buttons ------*/
const Custombuttons = (props) => {
  return (
    <button onClick={() => props.function(props.value+1)}>
      {props.text}
    </button>
  )
}

/*------- STATS -------*/
const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  if (all === 0) {
    return (
      <div>No feedback given</div>
    )
  }  
  return (
    <table><tbody>
      <StatisticLine text={props.txtgood} value={props.good} />
      <StatisticLine text={props.txtneutral} value={props.neutral} />
      <StatisticLine text={props.txtbad} value={props.bad} />
    
      <tr>
        <td>All</td>
        <td>{all}</td>
      </tr>
      <tr>
        <td>Average</td>
        <td>{(props.good - props.bad) / all}</td>
      </tr>
      <tr>
        <td>Positive</td>
        <td>{props.good * 100 / all} %</td>
      </tr>

    </tbody></table>
  )
}

const App = () => {

  /*-------- TEXT --------*/
  const title = 'Give feedback'
  const stats = 'Statistics'
  const txtgood = 'Good'
  const txtneutral = 'Neutral'
  const txtbad = 'Bad'

  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text={title} />
      <p>
        <Custombuttons function={setGood} value={good} text={txtgood} />
        <Custombuttons function={setNeutral} value={neutral} text={txtneutral} />
        <Custombuttons function={setBad} value={bad} text={txtbad} />
      </p>
      <Header text={stats} />
      <Statistics good={good} neutral={neutral} bad={bad} 
                  txtgood={txtgood} txtneutral={txtneutral} txtbad={txtbad}/>
    </div>
  )
}

export default App