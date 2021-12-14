import React, { useState } from 'react'

const format = (n) => Math.floor(n * 100) / 100

const Button = ({ text, clickHandler }) => <button onClick={clickHandler}>{text}</button>

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)
const Stats = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={bad} />
        <StatisticLine text="bad" value={neutral} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={format((good - bad) / total)} />
        <StatisticLine text="positive" value={`${format((good / total) * 100)}%`} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>Give Feedback</h1>
      <div>
        <Button text="good" clickHandler={() => setGood(good + 1)} />
        <Button text="neutral" clickHandler={() => setNeutral(neutral + 1)} />
        <Button text="bad" clickHandler={() => setBad(bad + 1)} />
      </div>
      <h2>Statistics</h2>
      {good + neutral + bad !== 0 ? <Stats good={good} neutral={neutral} bad={bad} /> : <p>No feedbacks given</p>}
    </>
  )
}

export default App
