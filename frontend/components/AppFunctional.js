import React, { useState } from 'react';

const initialEmail = '';
const initialSteps = 0;
const initialIndex = 4;

export default function AppFunctional(props) {
  const gridArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  const numRows = 3;
  const numCols = 3;

  const [index, setIndex] = useState(initialIndex);
  const [steps, setSteps] = useState(initialSteps);
  const [email, setEmail] = useState(initialEmail);
  const [message, setMessage] = useState('');

  function getXY(index) {
    const x = index % 3;
    const y = Math.floor(index / 3);
    return { x, y };
  }

  function reset() {
    setIndex(initialIndex);
    setSteps(initialSteps);
    setEmail(initialEmail);
    setMessage('');
  }

  function isValidMove(newIndex, currentIndex) {
    const currentX = currentIndex % numCols;
    const currentY = Math.floor(currentIndex / numCols);
  
    const newX = newIndex % numCols;
    const newY = Math.floor(newIndex / numCols);
  
    if (newX === currentX && newY === currentY) {
      setMessage('');
      return false;
    }
  
    const invalidDirections = [];
  
    if (newX < 0) {
      invalidDirections.push('left');
    } else if (newX >= numCols) {
      invalidDirections.push('right');
    }
  
    if (newY < 0) {
      invalidDirections.push('up');
    } else if (newY >= numRows) {
      invalidDirections.push('down');
    }
  
    if (invalidDirections.length > 0) {
      setMessage(`You can't go ${invalidDirections.join(' and ')}`);
      return false;
    }
  
    setMessage('');
    return true;
  }
  
  
  
  
  

  function getNextIndex(direction, currentIndex) {
    const numRows = 3;
    const numCols = 3;
  
    const currentRow = Math.floor(currentIndex / numCols);
    const currentCol = currentIndex % numCols;
  
    const directionDeltas = {
      left: { row: 0, col: -1 },
      right: { row: 0, col: 1 },
      up: { row: -1, col: 0 },
      down: { row: 1, col: 0 },
    };
  
    const delta = directionDeltas[direction] || { row: 0, col: 0 };
  
    const newRow = Math.max(0, Math.min(currentRow + delta.row, numRows - 1));
    const newCol = Math.max(0, Math.min(currentCol + delta.col, numCols - 1));
  
    const newIndex = newRow * numCols + newCol;
  
    return newIndex;
  }
  

  function move(direction) {
    const newIndex = getNextIndex(direction, index);

    if (isValidMove(newIndex, index)) {
      console.log(`Moving from ${index} to ${newIndex}`);
      setIndex(newIndex);
      setSteps(steps + 1);
      setMessage('');
    }
  }

  function onChange(evt) {
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    evt.preventDefault();
    console.log(`Email submitted: ${email}`);
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <div>
          <h3 id="coordinates">Coordinates ({getXY(index).x}, {getXY(index).y})</h3>
          <h3 id="steps">You moved {steps} times</h3>
        </div>
      </div>
      <div id="grid">
        {gridArray.map((idx) => (
          <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>
      <div className="info">
        <div id="message">{message}</div>
      </div>
      <div id="keypad">
        <button id="left" onClick={() => move('left')}>
          LEFT
        </button>
        <button id="up" onClick={() => move('up')}>
          UP
        </button>
        <button id="right" onClick={() => move('right')}>
          RIGHT
        </button>
        <button id="down" onClick={() => move('down')}>
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <div>
          <form onSubmit={onSubmit}>
            <input
              id="email"
              type="email"
              placeholder="type email"
              value={email}
              onChange={onChange}
            />
            <input id="submit" type="submit" />
          </form>
        </div>
    </div>
  );
}
