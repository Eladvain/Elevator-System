import React from 'react'
import ElavatorButton from './ElavatorButton';

const SystemButtons = (props) => {

  const displaySystemButtons = () =>{
    const buttons = [];
    for(let i = props.floors; i >= 0; i--){
      buttons.push(<ElavatorButton value = {i} key = {i} elevators = {props.elevators} updateState = {props.updateState} />)
    }
    return buttons;
  }
  

  
  return (
    <div className='systemButtons'>
      {displaySystemButtons()}
    </div>
  )
}

export default SystemButtons
