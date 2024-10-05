import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const Header = ({text}) => <h1> {text} </h1>

const Anecdotes = ({anecdote}) => <p> {anecdote} </p>

const AnecdoteMostVoted = ({anecdote, allVotes}) => {
  const highestVoteCount = Math.max(...allVotes)
  const indexMostVoted =  allVotes.indexOf(highestVoteCount)
  const mostVoted = anecdote[indexMostVoted]

  if(highestVoteCount === 0) return <p>No votes yet</p>

  return (
    <>
      <p>{mostVoted}</p>
      <p>has {highestVoteCount} votes</p>
    </>
)

}


const Votes = ({votes}) => <p>has {votes} votes</p>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(8).fill(0))

  const handleRandomCLick = () => {
    const randomValue = Math.floor(Math.random() * 8)
    setSelected(randomValue)
    console.log(randomValue)
  }

  const handleVoteClick = () => {
    const newAllVotes = [...allVotes]
    newAllVotes[selected] +=1
    setAllVotes(newAllVotes)
  }

  return (
    <div>
      <section>
        <Header text="Anecdote of the day"/>
        <Anecdotes anecdote={anecdotes[selected]}/>
        <Votes votes={allVotes[selected]} /> 
        <Button onClick={handleVoteClick} text="vote"/>
        <Button onClick={handleRandomCLick} text="next anecdote" />
      </section>

      <section>
        <Header text="Anecdote with most votes"/>
        <AnecdoteMostVoted anecdote={anecdotes} allVotes={allVotes}/>
      </section>

    </div>
  )
}

export default App