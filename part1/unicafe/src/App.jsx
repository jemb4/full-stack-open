import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const FeedBack = ({setGood, setNeutral, setBad}) => {
  const newClick = (value) => {
    value(value => value + 1)
  }

  return(
    <>
    <h1>give feedback</h1>
      <Button handleClick={()=> newClick(setGood)} text="good"/>
      <Button handleClick={()=> newClick(setNeutral)} text="neutral"/>
      <Button handleClick={()=> newClick(setBad)} text="bad"/>
    </>
  )   
}

const StatisticLine = ({text, value}) => {
  return(
  <tr>
    <td>{text} </td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = (good + neutral + bad)
  const average = (good - bad) / all
  const positive = good / all * 100

  if(!good && !neutral && !bad) return <><p>No feedback given</p></>

  return(
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <FeedBack setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App