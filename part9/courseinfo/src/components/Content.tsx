import React from 'react'
import { Part } from './Part'

interface Props {
  courseParts: CoursePart[]
}

const Content: React.FC<Props> = ({ courseParts }) => (
  <div>
    {courseParts.map((c, i) => (
      <div key={`${c.name}${i}`}>
        <Part part={c} />
      </div>
    ))}
  </div>
)

export default Content
