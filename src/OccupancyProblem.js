import React, { Component } from 'react';

const MAX_NUMBER = 999 //to indicate rejected booking
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
    if (value !== '') {
      value = parseInt(value)
      if (isNaN(value)) {
        return alert('Please enter number only')
      }
    } else {
      value = 0
    }
    this.setState({ [type]: value }, this.calculateResult)
  }

  calculateResult = () => {
    const { adult, children, infant } = this.state
    let room = 0

    if (adult >= children && adult >= infant) {
      room = Math.ceil(adult / 3)
    } else if (children > adult && children >= infant) {
      const ratioChildrenAdult = Math.ceil(children / adult)
      room = ratioChildrenAdult > 3 ? MAX_NUMBER : Math.ceil(children / 3)
    } else if (infant > adult && infant >= children) {
      const ratioInfantAdult = Math.ceil(infant / adult)
      room = ratioInfantAdult > 3 ? MAX_NUMBER : Math.ceil(infant / 3)
    }

    this.setState({ room })
  }
  handleFocus = (event) => event.target.select()

  render() {
    const { adult, children, infant, room } = this.state
    return (
      <div>
        <div style={styles.inputContainer} >Adult : <input onFocus={this.handleFocus} onChange={(e) => this.onChange('adult', e.target.value)} value={adult} /></div>
        <div style={styles.inputContainer} >Children : <input onFocus={this.handleFocus} onChange={(e) => this.onChange('children', e.target.value)} value={children} /></div>
        <div style={styles.inputContainer} >Infant : <input onFocus={this.handleFocus} onChange={(e) => this.onChange('infant', e.target.value)} value={infant} /></div>
        {room > 3 || (adult + children > 7) ?
          <div>Booking Rejected</div>
          :
          <div>Number of room{room > 1 ? 's' : ''} can be fit in : {room}</div>
        }
        {room === MAX_NUMBER && <div>Not enough adult to look after children / infant</div>}
      </div>
    );
  }
}