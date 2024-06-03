import { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  const incrementByOne=(name, setName)=>{
    const newvalue = name + 1
    setName(newvalue)
  }

  return (
    <>
    <Header content = "give feedback"/>
    <RenderButton name = "good" action ={() => incrementByOne(good, setGood)}/>
    <RenderButton name = "neutral" action ={() => incrementByOne(neutral, setNeutral)}/>
    <RenderButton name = "bad" action ={() => incrementByOne(bad, setBad)}/>
    
    <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

const Header = (props) =>{
  return(
    <>
    <h2>
      {props.content}
    </h2>
    </>
  )
}

const Statistics=(props)=>{

  const totalFeedbackAmount = props.good + props.neutral + props.bad

  if (totalFeedbackAmount === 0 || totalFeedbackAmount < 0){
    return(
      <>
      <Header content="statistics"/>
      No feedback given
      </>
    )
  }

  return(
    <>
    <Header content="statistics"/>
    <StatisticTable good={props.good} neutral={props.neutral} bad={props.bad} totalFeedbackAmount = {totalFeedbackAmount}/>
    </>
  )
}

const StatisticTable=(props)=>{
  return(
    <>
    <table>
      <tbody>
        <GenerateStatisticRow name = "neutral" value={props.neutral}/>
        <GenerateStatisticRow name = "bad" value={props.bad}/>
        <GenerateStatisticRow name = "all" value={props.totalFeedbackAmount}/>
        <GenerateStatisticRow name = "average" value={(props.good-props.bad)/props.totalFeedbackAmount}/>
        <GenerateStatisticRow name = "positive" value={(props.good/props.totalFeedbackAmount) * 100} sign="%"/>
      </tbody>
    </table>
    </>
  )

}

const GenerateStatisticRow = (props)=>{

  return(
    <tr>
      <td>
        {props.name}
      </td>
      <td>
        {props.value}{props.sign}
      </td>
    </tr>
  )

}

const RenderButton=(props)=>{
  return(
    <>
    <button onClick={props.action}>
      {props.name}
    </button>
    </>
  )
}

export default App