import React from 'react'

const Header = ({ course }) => <h1>{course.name}</h1>
const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
)
const Content = ({ course: { parts } }) =>
  parts.map(({ name, exercises }) => <Part key={name} name={name} exercises={exercises} />)
const Total = ({ course: { parts } }) => (
  <p>Number of exercises {parts.map((p) => p.exercises).reduce((a, b) => a + b)}</p>
)

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
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
