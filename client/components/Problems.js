import React from 'react'
import { connect } from 'react-redux'
import ProblemTable from './ProblemsTable'
import { Link } from 'react-router-dom'
// import { fetchProblems } from '../store'

function ProblemList(props) {
  const { allProblems } = props
  console.log(allProblems.problems)
  return (
    <div>
      <ProblemTable problems={allProblems} />
    </div>
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
