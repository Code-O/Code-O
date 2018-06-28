import React from 'react';
import { Link } from 'react-router-dom'
import { Button, Icon, Col, Card, CardTitle, Badge } from 'react-materialize'


const ProblemsTable = (props) => {

  const { problems } = props;

  return (
    <div>
      {
        problems && problems.map(problem => (
          <div key={problem.id}>
            <Col m={7} s={12} >
              <Card
                className='blue-grey darken-1'
                textClassName='white-text'
                title={problem.name}
                actions={[<Link to={`/problems/${problem.id}`} key={problem.id}>Try it</Link>,
                ]}>

                {problem.description}
              </Card>


            </Col>
          </div>
        ))
      }
    </div>
  );
}

export default ProblemsTable;