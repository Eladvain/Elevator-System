import React from 'react'
import Elevator from './Elevator'

const Floor = (props) => {
  return (
    <div className='floor-container'>
      {props.value === 0 &&(<Elevator liftNumber = {props.liftNumber}/>) }
      
    </div>
  )
}

export default Floor
