import React from 'react'
import PropTypes from 'prop-types'

import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Button, Icon} from 'react-materialize'
import '../styles/nav.css'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navigation">
    {isLoggedIn ? (
      <div className="card-panel midnightblue lighten-1">
         <h1>Code-O</h1>
        {/* The navbar will show these links after you log in */}
        <div className="nav">

          <Link to="/home">
            <Button waves="light">Home</Button>
          </Link>
          <Link to="/problems">
            <Button waves="light">Problems</Button>
          </Link>
          <a href="#" onClick={handleClick}>
            <Button waves="light">Logout</Button>
          </a>
        </div>
      </div>
    ) : (
      <div className="nav-menu">
        {/* The navbar will show these links before you log in */}
        {/* <Link to="/login">
            <Button waves="light">Login</Button>
          </Link>
          <Link to="/signup">
            <Button waves="light">Sign Up</Button>
          </Link> */}
      </div>
    )}
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
