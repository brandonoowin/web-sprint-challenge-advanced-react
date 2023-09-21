import React, { useState } from 'react'
import axios from 'axios'


// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const gridArray = [0, 1, 2, 3, 4, 5, 6, 7, 8]

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState('');

  function getXY(index) {
    let x = 0;
    let y = 0;

    if (index === 0) {
      x = index + 1;
      y = index + 1;
    } else if (index === 1) {
      x = index + 1;
      y = index + 0; 
    } else if (index === 2) {
      x = index + 1
      y = index - 1;
    } else if (index === 3) {
      x = index - 2;
      y = index - 1;
    } else if (index === 4) {
      x = index - 2; 
      y = index - 2;
    } else if (index === 5) {
      x = index - 2; 
      y = index - 3;
    } else if (index === 6) {
      x = index - 5; 
      y = index - 3;
    } else if (index === 7) {
      x = index - 5; 
      y = index - 4; 
    } else if (index === 8) {
      x = index - 5;
      y = index - 5;
    }
    const cord = `${x}, ${y}`
    
    return cord;
    // It it not necessary to have a state to track the coordinates.
    // It's enough to know what index the "B" is at, to be able to calculate them.
  //   function getXY(index) {
  //     let x = index % 3 + 1;
  //     let y = Math.floor(index / 3) + 1;
  //     const cord = [x, y];
  //     return cord;
  // }
  }

  function getXYMessage(index) {
    return `Coordinates (${getXY(index)})`
    // It it not necessary to have a state to track the "Coordinates (2, 2)" message for the user.
    // You can use the `getXY` helper above to obtain the coordinates, and then `getXYMessage`
    // returns the fully constructed string.
  }
  getXYMessage(0)

  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage('');
    // Use this helper to reset all states to their initial values.
  }

  function getNextIndex(direction) {
    let nextIndex = index;
    
    // Calculate the potential next index based on the direction
    if (direction === 'up' && index >= 3) {
      nextIndex -= 3;
    } else if (direction === 'down' && index <= 5) {
      nextIndex += 3;
    } else if (direction === 'left' && index % 3 !== 0) {
      nextIndex -= 1;
    } else if (direction === 'right' && index % 3 !== 2) {
      nextIndex += 1;
    }
  
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
    } else {
      setMessage(`You can't go ${direction}`);
    }
  
    return nextIndex;
  }
  

  function move(direction) {
    const nextIndex = getNextIndex(direction);
  
    if (nextIndex !== index) {
      setIndex(nextIndex);
      setSteps(steps + 1);
    } else {
      setMessage(`You can't go ${direction}`);
    }
  }
  

  function onChange(evt) {
    const newEmail = evt.target.value;
    setEmail(newEmail);
  }
  

  function onSubmit(evt) {
    evt.preventDefault();
  
    // Create the payload object
    const payload = {
      x: getXY(index).split(',')[0].trim(),
      y: getXY(index).split(',')[1].trim(),
      steps,
      email,
    };
    
  
    // Make a POST request to the API
    axios.post('http://localhost:9000/api/result', payload)
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        setMessage(`Error: ${error.response.data.message}`);
      });
  }
  


  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMessage(index)}</h3>
        <h3 id="steps">You moved {steps} times</h3>
      </div>
      <div id="grid">
        {
          gridArray.map(idx => (
            <div key={idx} className={`square${idx === 4 ? ' active' : ''}`}>
              {idx === 4 ? 'B' : null}
            </div>
          ))
        }
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>LEFT</button>
        <button id="up" onClick={() => move('up')}>UP</button>
        <button id="right" onClick={() => move('right')}>RIGHT</button>
        <button id="down"onClick={() => move('down')}>DOWN</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>
      <form onSubmit={onSubmit}>
        <input id="email" type="email" placeholder="type email" value={email} onChange={onChange}></input>
        <input id="submit" type="submit" value='Submit'></input>
      </form>
    </div>
  )
}