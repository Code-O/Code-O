import React, {Component} from 'react'

import Problems from './Problems'

class Dashboard extends Component {
  render() {
    return (
      <div>
        {/* extract heading Component w/user data */}
        <div className="heading" style={{backgroundColor: 'skyblue'}}>
          <h1>Logo</h1>
          <ul>
            <li>Profile</li>
            <li>Settings</li>
            <li>Log Out</li>
          </ul>
        </div>

        <Problems />
      </div>
    )
  }
}

export default Dashboard
