import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [points,setPoints] = useState([])


  if(points.length === 0){
    setPoints(Array(anecdotes.length).fill(0))
  }

  const handleSelection = () => setSelected(Math.floor(Math.random() * anecdotes.length))

  const handleVotes = () => {
    const copy = [...points]
    copy[selected]+=1
    setPoints(copy)
    }

  const handleTop = () => {
    var max = points[0];
    var maxIndex = 0;

    for (var i = 1; i < points.length; i++) {
        if (points[i] > max) {
            maxIndex = i;
            max = points[i];
        }
    }
    return [anecdotes[maxIndex], points[maxIndex]];
}

  const [mostVoted, voteAmount] = handleTop();

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]} <br/>
      has {points[selected]} votes<br/>
      <Button handleClick = {handleVotes} text = "vote"></Button>
      <Button handleClick = {handleSelection} text = "next anedctote"></Button>
      <h1>Anedctote with most votes</h1>
      {mostVoted}<br/>
      has {voteAmount} votes
    </div>
  )
}

export default App