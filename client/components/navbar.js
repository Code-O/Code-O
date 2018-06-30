import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import { Button, Icon } from 'react-materialize'
const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>
    <h1>Code O</h1>
    <nav >
      {isLoggedIn ? (
        <div className='card-panel teal lighten-2'>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">
            <Button waves='light'>Home</Button>
          </Link>
          <a href="#" onClick={handleClick}>
            <Button waves='light'>Logout</Button>
          </a>
          <Link to="/problems">
            <Button waves='light'>Problems</Button>
          </Link>
        </div>
      ) : (
          <div className='card-panel teal lighten-2'>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">
              <Button waves='light'>Login</Button>
            </Link>
            <Link to="/signup">
              <Button waves='light'>Sign Up</Button>
            </Link>

          </div>
        )}
    </nav>
    <hr />
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
