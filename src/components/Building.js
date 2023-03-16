import React from 'react'
import Floor from './Floor';

const Building = (props) => {

  const mapMyFloors = () => {
    const floorsArr = [];
    for (let i = 9; i >= 0; i--) {
      floorsArr.push(<Floor key={i} value={i} liftNumber = {props.number} />);
    }
    return floorsArr;
  };

  return (
    <div className='building-container'>
      {/* <h1 className='name'>Elad</h1> */}
      {mapMyFloors()}
    </div>
  )
}

export default Building
