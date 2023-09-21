import React from 'react'
import axios from 'axios'

// Suggested initial states
const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4 // the index the "B" is at
const gridArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];


export default class AppClass extends React.Component {

  constructor() {
    super();
    this.state = {
      index: initialIndex,
      steps: initialSteps,
      email: initialEmail,
      message: initialMessage,
    };
  }
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.

  getXY(index) {
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
  }

  getXYMessage(index) {
    return `Coordinates (${this.getXY(index)})`;
  }

  reset = () => {
    this.setState({
      index: initialIndex,
      steps: initialSteps,
      email: initialEmail,
      message: '',
    });
  }

  getNextIndex(direction) {
    let nextIndex = this.state.index;
    
    if (direction === 'up' && this.state.index >= 3) {
      nextIndex -= 3;
    } else if (direction === 'down' && this.state.index <= 5) {
      nextIndex += 3;
    } else if (direction === 'left' && this.state.index % 3 !== 0) {
      nextIndex -= 1;
    } else if (direction === 'right' && this.state.index % 3 !== 2) {
      nextIndex += 1;
    }
  
    if (nextIndex !== this.state.index) {
      this.setState({
        index: nextIndex,
        steps: this.state.steps + 1,
        message: '',
      });
    } else {
      this.setState({
        message: `You can't go ${direction}`,
      });
    }
  
    return nextIndex;
  }
  

  move = (direction) => {
    const nextIndex = this.getNextIndex(direction);
  
    if (nextIndex !== this.state.index) {
      this.setState({
        index: nextIndex,
        steps: this.state.steps + 1,
        message: '',
      });
    } else {
      this.setState({
        message: `You can't go ${direction}`,
      });
    }
  }
  

  onChange = (evt) => {
    const newEmail = evt.target.value;
    this.setState({ email: newEmail });
  }
  

  onSubmit = (evt) => {
    evt.preventDefault();
  
    const payload = {
      x: this.getXY(this.state.index).split(',')[0].trim(),
      y: this.getXY(this.state.index).split(',')[1].trim(),
      steps: this.state.steps,
      email: this.state.email,
    };
    
    axios.post('http://localhost:9000/api/result', payload)
      .then(response => {
        this.setState({ message: response.data.message, email: initialEmail });

      })
      .catch(error => {
        this.setState({ message: `Error: ${error.response.data.message}` });
      });
  }

  render() {
    const { index, steps, email, message } = this.state;

    return (
      <div id="wrapper" className={this.props.className}>
        <div className="info">
          <h3 id="coordinates">{this.getXYMessage(index)}</h3>
          <h3 id="steps">{`${steps === 1 ? `You moved ${steps} time` : `You moved ${steps} times`}`}</h3>
        </div>
        <div id="grid">
          {gridArray.map((idx) => (
            <div key={idx} className={`square${idx === index ? ' active' : ''}`}>
              {idx === index ? 'B' : null}
            </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message">{message}</h3>
        </div>
        <div id="keypad">
          <button id="left" onClick={() => this.move('left')}>LEFT</button>
          <button id="up" onClick={() => this.move('up')}>UP</button>
          <button id="right" onClick={() => this.move('right')}>RIGHT</button>
          <button id="down" onClick={() => this.move('down')}>DOWN</button>
          <button id="reset" onClick={this.reset}>reset</button>
        </div>
        <form onSubmit={this.onSubmit}>
          <input
            id="email"
            type="email"
            placeholder="type email"
            value={email}
            onChange={this.onChange}
          />
          <input id="submit" type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
