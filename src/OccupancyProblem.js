import React, { Component } from 'react';

const styles = {
  inputContainer: {
    margin: '10px'
  }
}
export default class App extends Component {
  state = {
    adult: 0,
    children: 0,
    infant: 0,
    room: 0
  }

  onChange = (type, value) => {
    if (value != '') {
      value = parseInt(value)
      if (isNaN(value)) {
        return alert('Please enter number only')
      }
    } else {
      value = 0
    }
    this.setState({ [type]: value }, () => {
      const { adult, children, infant } = this.state

    })
  }
  render() {
    const { adult, children, infant, room } = this.state
    return (
      <div>
        <div style={styles.inputContainer} >Adult : <input onChange={(e) => this.onChange('adult', e.target.value)} value={adult} /></div>
        <div style={styles.inputContainer} >Children : <input onChange={(e) => this.onChange('children', e.target.value)} value={children} /></div>
        <div style={styles.inputContainer} >Infant : <input onChange={(e) => this.onChange('infant', e.target.value)} value={infant} /></div>
        {room > 3 || (adult + children > 7) ?
          <div>Booking Rejected</div>
          :
          <div>Number of room{room > 1 ? 's' : ''} can be fit in : {room}</div>
        }
      </div>
    );
  }
}