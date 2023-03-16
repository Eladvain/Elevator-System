import React from 'react'
import Building from './Building';
import SystemButtons from './SystemButtons';

const SystemBuildings = (props) => {

  // const elevators = props.allElevators;
  const systemBuildings = () =>{
    
    const buildings = [];
    for(let i = 1 ; i <= props.numbers; i++){
      buildings.push(<Building number = {i} key = {i} />)
    }
    return buildings;
  }

  return (
    <div className='systemBuildings'>
      {systemBuildings()}
      <SystemButtons floors = {9} key = {9} elevators = {props.elevators} />
    </div>
  )
}

export default SystemBuildings
