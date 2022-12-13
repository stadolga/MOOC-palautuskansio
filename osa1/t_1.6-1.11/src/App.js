import { useState } from 'react'

const StatisticLine = (props) => {
  return(
  <>
    <tr><td>{props.text} {props.value}</td></tr>
  </>
)}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
  const overall = (props.good+props.bad+props.neutral)
  if (overall === 0)
    return(<><p>No feedback given</p></>) 
    
  return(
    <>
      <table>
        <thead>
        <StatisticLine text = "good" value = {props.good}/>
        <StatisticLine text = "neutral" value = {props.neutral}/>
        <StatisticLine text = "bad" value = {props.bad}/>
        <StatisticLine text = "all" value = {overall}/>
        <StatisticLine text = "average" value = {(props.good-props.bad)/overall}/>
        <StatisticLine text = "positive" value = {props.good*100/overall +"%"}/>
        </thead>
      </table>
    </>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick = {handleGood} text = "good" />
      <Button handleClick = {handleNeutral} text = "neutral" />
      <Button handleClick = {handleBad} text = "bad" />
      <h1> statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App