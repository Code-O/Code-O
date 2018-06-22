import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProblems, postProblem} from '../store'





class Problems extends Component {

  render() {
    console.log('----->',this.props)
    return (
      <div>
        <p>jdkashf</p>
      </div>
    )     
}
}

const mapStateToProps = (state)=>{
  return{
    problems:state.allProblems
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    loadALLProblems:()=>dispatch(fetchProblems()),
    addProblem:(problemId)=>dispatch(postProblem(problemId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Problems)
