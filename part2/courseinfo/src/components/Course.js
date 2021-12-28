import React from 'react'
import Content from './Content'
import Total from './Total'

const Header = ({ course }) => <h1>{course.name}</h1>

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course
