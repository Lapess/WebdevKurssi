import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])
  const [TotalClicks, setTotalClicks] = useState([])


  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1;
    setLeft(updatedLeft)
    setTotalClicks(updatedLeft + right)
  }


  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1;
    setRight(updatedRight)
    setTotalClicks(updatedRight + left)
  }

  return (
    <div>
      <div>
        {left}
        <Button handleClick={handleLeftClick} text="Left"/>
        <Button handleClick={handleRightClick} text="Right"/>
        {right}

        Total amount of clicks: {TotalClicks}
        <History allClicks={[allClicks]}/>
      </div>
    </div>
  )
}

const History = (props) =>{

  return(
    <>
    <p>
    History of pressed buttons: {props.allClicks.join(" ")}
    </p>
    </>
  )

}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
export default App