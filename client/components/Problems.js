import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchProblems} from '../store'





class Problems extends Component {


// componentDidMount(){
//   this.props.loadALLProblems()
// }

  render() {
    // console.log('******', this.props)
    return (
      <div>
        <h1>Test</h1>
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
    // addProblem:(problemId)=>dispatch(postProblem(problemId))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Problems)
