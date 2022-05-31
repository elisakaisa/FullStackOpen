import React from 'react';


// EXERCISE 1.1

const Header = (props) => {
  return (
    <div>
      <h1>{props.course.name}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.course.parts[0].name} exercise={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercise={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercise={props.course.parts[2].exercises} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>Number of exercises {props.course.parts[0].exercises + 
                              props.course.parts[1].exercises + 
                              props.course.parts[0].exercises}</div>
  )
}

// EXERCISE 1.2
const Part = (props) => {
  return (
    <div><p>{props.part} {props.exercise}</p></div>
  )
}


const App = () => {
  
  //  EXERCISE 1.3 & 1.4 & 1.5
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App
