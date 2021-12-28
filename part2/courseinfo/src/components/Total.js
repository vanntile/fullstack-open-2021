import React from 'react'

const Total = ({ course }) => (
  <p style={{ fontWeight: 'bold' }}>
    Total of {course.parts.map((p) => p.exercises).reduce((a, b) => a + b)} exercises
  </p>
)

export default Total
