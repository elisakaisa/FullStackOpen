import React from 'react';


const Course = ({course}) =>
  <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>


const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) => 
  <p>
    Number of exercises {parts.reduce((s,p) => s+p.exercises, 0)}
  </p>


const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) =>
  <div>
    {parts.map(part => 
      <div key={part.id}>
        <Part part={part} />
      </div>)}
  </div>

const Courses = ({courses}) => {
    return (
        <div>
        {courses.map(course =>
        <div key={course.id}>
            <Course course={course} />
        </div>)}
        </div>
    )
}

export default Courses
