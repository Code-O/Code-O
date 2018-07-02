import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Card, CardText, CardBody, CardTitle} from 'reactstrap'

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div style={{margin: '10px'}}>
      <br />
      <br />
      <h3>Welcome, {email}</h3>
      <div style={{width: '250px'}}>
        <Card>
          <div style={{padding: '10px', margin: '10px'}}>
            <CardBody>
              <CardTitle>Poblems Solved</CardTitle>
              <CardText>blabla</CardText>
            </CardBody>
          </div>
        </Card>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
