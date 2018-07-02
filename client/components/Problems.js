import React from 'react'
import {connect} from 'react-redux'
import ProblemTable from './ProblemsTable'

function ProblemList(props) {
  const {allProblems} = props
  console.log(allProblems.problems)
  return (
    <div>
      <ProblemTable problems={allProblems} />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    allProblems: state.problems
  }
}

export default connect(mapStateToProps, null)(ProblemList)
