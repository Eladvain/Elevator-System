import React from 'react'

const ElavatorButton = (props) => {


  function moveElevatorInterval(direction, elevators, elevatorNum, lift, numOfButton, button ){
    let y= 0;
    const myInterval = setInterval(()=>{
      
      //------check if lift needs to move up or down---------
      (direction === 'up')? y-=5 : y+=5;
    
      let buttom = `${props.elevators[elevatorNum-1].yPosition+y}px`;
      lift[0].style.top = buttom;
  
      if(numOfButton !== 0){
  
        if(lift[0].style.top === `-${((numOfButton*100)/2)}px`){
          
          props.elevators[elevatorNum-1].yPosition = -(((numOfButton*100)/2));
          props.elevators[elevatorNum-1].liftFloor = numOfButton;
          y=0;
          liftReachedFloor(lift[0], button, myInterval, props.elevators,elevatorNum-1);
      }
        
      }
      else{
        if(lift[0].style.top === '10px'){
  
          props.elevators[elevatorNum-1].yPosition = 10;
          props.elevators[elevatorNum-1].liftFloor = numOfButton;
          y=0;
          liftReachedFloor(lift[0], button, myInterval, props.elevators,elevatorNum-1);
  
        }
      }
  
    }, 100);
  

  }
  

  const findTheClosestElevator = (allElevators, targetFloor)=>{

    let allElevatorsMove = true;
    let minDistance = 100;
    let elevatorNum = 0;

    allElevators.map(elevator=>{
      
      if(elevator.move === false){

        allElevatorsMove = false;
        const liftFloor = elevator.liftFloor;

        //------check distance between all elevators curr floor location to target floor------

        if(Math.abs(targetFloor - liftFloor) < minDistance){

          minDistance = Math.abs(targetFloor - liftFloor);
          elevatorNum = elevator.id;
        } 
      }
    })

    return allElevatorsMove === false ? elevatorNum : null;
  }

  const changeButtonDetails = (classNameOfButton, lift, isMove, elevetorNum, elevators) =>{
  
    //------clicked on a floor where has not elevator in the same floor-----

    if(classNameOfButton.innerText === 'Call' && isMove === true){
      classNameOfButton.style.backgroundColor = 'red';
      classNameOfButton.innerText = 'Waiting';
      lift.style.backgroundColor = "red";
    }
    
    //-----clicked on a floor bottun where has an elevator------------

    else if(classNameOfButton.innerText === 'Call' && isMove === false){

      lift.style.backgroundColor = "green";
      classNameOfButton.style.backgroundColor = "white";
      classNameOfButton.style.color = "green";
      classNameOfButton.innerText = "Arrived";

    // elevator come to target floor and change all css request

      setTimeout(()=>{
        lift.style.backgroundColor = "white";
        classNameOfButton.style.backgroundColor = "green";
        classNameOfButton.innerText = "Call";
        classNameOfButton.style.color = "white";
        elevators[elevetorNum-1].move = false;
      },2000)

    }

    
    else if(classNameOfButton.innerText === 'Waiting' && isMove === true){
      lift.style.backgroundColor = "green";
      classNameOfButton.style.color = "green";
      classNameOfButton.style.backgroundColor = "white";
      classNameOfButton.innerText = "Arrived";
    }
    
  }

  //------ find if I need to move up or down --------- 

  function findMoveDirection(elevatorNum, targetFloor){
    return (targetFloor - elevatorNum > 0) ? 'up' : 'down';
  }

  //----- find next elevator num to move when all elevators are moveing -------

  function getNextElevatorWhoWillBeFreeToMove(allElevators, target){

    let minLengthOfSelectedArray = 100;
    let elevatorNum = 0;

    for(let i = 0; i < allElevators.length; i++){

      if(allElevators[i].selectedFloor.length === 0){

        //--update min distance between next floor of all elevators to clicked button floor ---

        if(Math.abs(target - allElevators[i].nextFloor) < minLengthOfSelectedArray){
          minLengthOfSelectedArray = Math.abs(target - allElevators[i].nextFloor);
          elevatorNum = allElevators[i].id;
        }
      }
    }
    
    allElevators[elevatorNum - 1].selectedFloor.push(target);
    
    // ----return elevator num with the smallest distance to the clicked button
    return elevatorNum;
  }
  

  const handleOnClick = async (event) =>{
    //-----find target floor call click-------------------
  
    const classNameOfButton = event.target.className;

    if(event.target.innerText !== 'Waiting' && event.target.innerText !== 'Arrived'){

    const buttonNameArrSplit = classNameOfButton.split('-');
    const numOfButton = parseInt(buttonNameArrSplit[1]);

    //------find the closest elevator who doesnt move and min distance to target floor------
    let elevatorNum = findTheClosestElevator(props.elevators, numOfButton);

    if(elevatorNum === null){  //if all elevators moveing right now
      // find next elevator who will move to this clicked
      elevatorNum = getNextElevatorWhoWillBeFreeToMove(props.elevators,numOfButton);
    }

    if(numOfButton !== props.elevators[elevatorNum-1].liftFloor){

      props.elevators[elevatorNum-1].nextFloor = numOfButton;

      if((props.elevators[elevatorNum-1].id === elevatorNum && props.elevators[elevatorNum-1].move === false 
       && props.elevators[elevatorNum-1].selectedFloor.length === 0)){

        props.elevators[elevatorNum-1].move = true;

        const direction = findMoveDirection(props.elevators[elevatorNum-1].liftFloor, numOfButton);

        const lift = document.getElementsByClassName(`liftNumber-${props.elevators[elevatorNum-1].id}`);

        //-------------change button click color--------------------
        changeButtonDetails(event.target, lift[0], true, elevatorNum, props.elevators);
    
        //----- interval for moving elevator to his target floor-------
        moveElevatorInterval(direction, props.elevators, elevatorNum, lift, numOfButton, event.target);
        
    }
    else if(props.elevators[elevatorNum-1].id === elevatorNum && props.elevators[elevatorNum-1].move === true
         && props.elevators[elevatorNum-1].selectedFloor.length === 1){

      const lift = document.getElementsByClassName(`liftNumber-${props.elevators[elevatorNum-1].id}`);

      changeButtonDetails(event.target, lift[0], true, elevatorNum, props.elevators);
      
      const waitForElevatorInterval=setInterval(()=>{
        
        if(props.elevators[elevatorNum-1].move === false){

          props.elevators[elevatorNum-1].move = true;
          
          const direction = findMoveDirection(props.elevators[elevatorNum-1].liftFloor, numOfButton);
          moveElevatorInterval(direction, props.elevators, elevatorNum, lift, numOfButton, event.target);
          
          clearInterval(waitForElevatorInterval);
        }

      }, 5)
      
     }

    }

    //----There is an elevator in this floor clicked and she doesn't move
    else{

      const lift = document.getElementsByClassName(`liftNumber-${props.elevators[elevatorNum-1].id}`);
      props.elevators[elevatorNum-1].move = true;
      changeButtonDetails(event.target, lift[0], false, elevatorNum, props.elevators);

    }
    
  }

}

  //----elevator reached to the destination ------
  function liftReachedFloor(lift, buttonFloor, myInterval, elevators, index, secondInterval){

    changeButtonDetails(buttonFloor, lift, true, index, elevators);

    var audio = new Audio(
      'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                  audio.play();

    clearInterval(myInterval);

    //----wait 2 seconds and update all css requests

    setTimeout(()=>{
      lift.style.backgroundColor = "white";
      buttonFloor.style.backgroundColor = "green";
      buttonFloor.innerText = "Call";
      buttonFloor.style.color = "white";
      elevators[index].move = false;
      elevators[index].selectedFloor.pop();
    },2000)

    clearInterval(secondInterval);
  
  }


  return (
    <div className='elevatorButtonDiv'>
      <button onClick={handleOnClick} className={`elevatorButton-${props.value}`}>Call</button>
    </div>
  )

}
export default ElavatorButton;
