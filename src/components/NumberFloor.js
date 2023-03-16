import React from 'react'

const NumberFloor = (props) => {

const displayNumbersFloors = ()=>{
  const arrNumbersFloors = [];
  for(let i = props.numbers; i >= 0; i--){
    if(i !== 0){
      arrNumbersFloors.push(<div className='numberFloor' key = {i}> <p id="floorNum">{i}</p></div>);
    }
    else{
      arrNumbersFloors.push(<div className='numberFloor' key = {i}><p id="floorNum">Ground Floor</p></div>);
    }
    
  }
  return arrNumbersFloors;
}

  return (
    <div className='numbersFloors'>
      {displayNumbersFloors()}
    </div>
  )
}

export default NumberFloor
