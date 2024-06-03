import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Int32Array(anecdotes.length))

  const setRandomAnecdote=(anecdoteslen)=>{
    let newanecdoteindex = (Math.floor(Math.random() * anecdoteslen))

    while (newanecdoteindex === selected){
      newanecdoteindex = (Math.floor(Math.random() * anecdoteslen))
    }
    setSelected(newanecdoteindex)
  }
  const incrementVote=()=>{
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }

  const mostVotesIndex = votes.indexOf(Math.max(...votes))

  return (
    <>
    <div>
      {anecdotes[selected]}
    </div>
      <Button clickhandler = {()=>setRandomAnecdote(anecdotes.length)} text = "next anecdote"/>
      <Button clickhandler = {incrementVote} text="vote"/>
      <MostVoted anecdote = {anecdotes[mostVotesIndex]} votes = {votes[mostVotesIndex]}/>
    </>
  )
}

const Button=(props)=>{
  return(
    <div>
    <button onClick={props.clickhandler}>
      {props.text}
    </button>
    </div>
  )
}

const MostVoted=(props)=>{

  const showVotes=(anecdotes,votes)=>{
    if (votes > 0){
      return(
        <>
        <div>
        " {anecdotes} "
        </div>
        <div>
                this anecdote has {votes} votes
        </div>
        </>
      )
    }
    else{
      return(
        <>
        No votes yet registered
        </>
      )
    }

  }

  return(
    <>
    <h2>
      Anecdote with most votes
    </h2>
    {showVotes(props.anecdote ,props.votes)}
    </>
  )
}

export default App