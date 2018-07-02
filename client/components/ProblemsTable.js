import React from 'react'
import {Link} from 'react-router-dom'
// import {Button, Icon, Col, Card, CardTitle, Badge} from 'react-materialize'
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  Button
} from 'reactstrap'
import '../styles/problemsTable.css'

const ProblemsTable = props => {
  const {problems} = props

  return (
    <div className="problem-container">
      {problems &&
        problems.map(problem => (
          <div className="problem-card" key={problem.id}>
            {/* <Col m={7} s={12}>
              <Card
                horizontal="true"
                className="blue-grey darken-1"
                textClassName="white-text"
                title={problem.name}
                actions={[
                  <Link to={`/problems/${problem.id}`} key={problem.id}>
                    Try it
                  </Link>
                ]}
              >
                {problem.description}
              </Card>
            </Col>
             */}
            <Card>
              <div style={{padding: '10px'}}>
                <CardBody>
                  <CardTitle>{problem.name}</CardTitle>
                  <CardText>{problem.description}</CardText>
                  <Button>
                    {' '}
                    <Link to={`/problems/${problem.id}`} key={problem.id}>
                      Solve
                    </Link>
                  </Button>
                </CardBody>
              </div>
            </Card>
          </div>
        ))}
    </div>
  )
}

export default ProblemsTable
