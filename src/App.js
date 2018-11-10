import React, { Component } from 'react';
import axios from 'axios'
import logo from './logo.svg';
import Modal from 'react-modal';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import "react-tabs/style/react-tabs.css";
import './App.css';
import OccupancyProblem from './OccupancyProblem'

class App extends Component {
  state = { data: {}, selectedData: null }
  componentDidMount() {
    axios.get("./test.json")
      .then((result) => {
        const data = {}
        result.data.map((r) => {
          if (data[r.roomTypeLabel]) {
            data[r.roomTypeLabel].push(r)
          } else {
            data[r.roomTypeLabel] = [r]
          }
        })
        this.setState({ data })
      })
      .catch((e) => alert(JSON.stringify(e)))
  }

  closeModal = () => this.setState({ selectedData: null })
  render() {
    const content = []
    const { data, selectedData } = this.state
    for (const [key, value] of Object.entries(data)) {
      content.push(<div className="parentContainer">
        <table style={{ width: '100%' }}>
          <tr>
            <td style={{ verticalAlign: 'top' }}>
              {key}
            </td>
            <td>
              <table>
                {value.map((i) => {
                  return <tr style={{ borderBottom: '' }}>
                    <td >
                      <div className="cellContainer">
                        <div>Bed Type : {i.bedTypeLabel.length > 0 ? i.bedTypeLabel.toString() : '-'}</div>
                        <div>{i.boardCodeDescription}</div>
                      </div>
                    </td>
                    <td >
                      <div className="actionContainer">
                        <div>RM {i.totalPrice}</div>
                        <div className="actionButton" onClick={() => { this.setState({ selectedData: i }); }}>View</div>
                      </div>
                    </td>
                  </tr>
                })}
              </table>
            </td>
          </tr>
        </table>
      </div>)
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Tabs>
            <TabList>
              <Tab>Assignment 1</Tab>
              <Tab>Occupancy Problem</Tab>
            </TabList>

            <TabPanel>
              <h2>Assignment 1</h2>
              {content}
            </TabPanel>
            <TabPanel>
              <h2>Occupancy Problem</h2>
              <OccupancyProblem />
            </TabPanel>
          </Tabs>
        </header>
        <Modal
          isOpen={selectedData}
          onRequestClose={this.closeModal}
          aria={{
            labelledby: "heading",
            describedby: "full_description"
          }}>
          {selectedData && <div>
            <h1 id="heading">{selectedData.name} ({selectedData.groupKey})</h1>
            <div id="full_description">
              <p>{selectedData.description}</p>
              <p>Accommodation : {selectedData.accommodateText}</p>

            </div>
          </div>}
          <div onClick={this.closeModal} className="closeButton">close</div>
        </Modal>

      </div>
    );
  }
}

export default App;
