import React from 'react'

const Elevator = (props) => {
  return (
    <div>
      <img className={`liftNumber-${props.liftNumber}`} src = 'https://img.icons8.com/ios/256/elevator.png' alt = '' style = {{width : 30, height : 30, top: 10, position:'relative'}}></img>
    </div>
  )
}

export default Elevator
