
import { useState } from 'react';
import './App.css';
import NumberFloor from './components/NumberFloor';
import SystemBuildings from './components/SystemBuildings';
// import SystemButtons from './components/SystemButtons';

const initState = [{
  id: 1,
  liftFloor: 0,
  nextFloor: 0,
  xPosition: 0,
  yPosition: 0,
  selectedFloor: [],
  targetFloor : 0,
  direction: 'idle',
  move: false
},
{
  id: 2,
  liftFloor: 0,
  nextFloor: 0,
  xPosition: 0,
  yPosition: 0,
  selectedFloor: [],
  targetFloor : 0,
  direction: 'idle',
  move: false
},
{
  id: 3,
  liftFloor: 0,
  xPosition: 0,
  yPosition: 0,
  selectedFloor: [],
  targetFloor : 0,
  direction: 'idle',
  move: false
},
{
  id: 4,
  liftFloor: 0,
  xPosition: 0,
  yPosition: 0,
  selectedFloor: [],
  targetFloor : 0,
  direction: 'idle',
  move: false
},
{
  id: 5,
  liftFloor: 0,
  xPosition: 0,
  yPosition: 0,
  selectedFloor: [],
  targetFloor : 0,
  direction: 'idle',
  move: false
}
];

function App() {
  const [appState, setAppState] = useState(initState);

  return (
    <div className="App">
      <NumberFloor numbers = {9} />
      <SystemBuildings numbers = {5} elevators = {appState} updateState = {setAppState}  />
    </div>
  );
}

export default App;
