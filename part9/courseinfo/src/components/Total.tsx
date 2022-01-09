import React from 'react'

interface Props {
  courseParts: CoursePart[]
}

const Total: React.FC<Props> = ({ courseParts }) => (
  <p>Number of exercises {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
)

export default Total
