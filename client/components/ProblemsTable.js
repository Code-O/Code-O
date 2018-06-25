import React from 'react';
import { Link } from 'react-router-dom'

const ProblemsTable = (props) => {

  const { problems } = props;

  return (
    <table >
      <thead>
        <tr>
          <th>
            <h3>Name</h3>
          </th>
          <th>
            <h3>Description</h3>
          </th>
          <th>
            <h3>Difficulty</h3>
          </th>
          <th>
            <h3>TRY</h3>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          problems && problems.map(problem => (
            <tr key={problem.id}>
              <td>
                <strong>
                  {problem.name}
                  <br />
                  <br />
                </strong>
              </td>
              <td>
                <span>{problem.description}</span>
              </td>
              <td>{problem.difficulty}</td>
              <td>
                <Link to={`/problems/${problem.id}`}>
                  <button>TRY IT</button>
                </Link>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}

export default ProblemsTable;