import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
// import { fetchProblems } from '../store'

function ProblemList(props) {
  const { allProblems } = props
  console.log(allProblems.problems)
  return (

    <ul>
      {
        allProblems.map(problem => {
          return (
            <li key={problem.id}>
              <NavLink to={`/problems/${problem.id}`}>
                {problem.name}
              </NavLink>
            </li>
          )
        })
      }
    </ul>
  )
}

const mapStateToProps = (state) => {
  return {
    allProblems: state.problems
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     loadALLProblems: () => dispatch(fetchProblems()),
//     // addProblem:(problemId)=>dispatch(postProblem(problemId))
//   }
// }

export default connect(
  mapStateToProps,
  null,
)(ProblemList)
