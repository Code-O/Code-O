import React, {Component} from 'react'
import {connect} from 'react-redux'
import brace from 'brace'
import axios from 'axios'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputCode: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleChange = event => {
    this.setState({
      inputCode: event
    })
  }

  handleSumbit = event => {
    event.preventDefault()
    axios
      .post('/api/problems', {code: this.state.inputCode})
      .catch(err => console.log(err))
  }
  render() {
    const {allProblems, problemId} = this.props
    let singleProblem =
      allProblems.filter(problem => problem.id === problemId)[0] || ''
    return (
      <div>
        <form onSubmit={this.handleSumbit}>
          {singleProblem.name}
          <br />
          <br />
          {singleProblem.description}
          <br />
          <br />
          <button type="submit">RUN TEST</button>
          <br />
          <br />
        </form>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.handleChange}
          value={this.state.inputCode}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const problemId = Number(ownProps.match.params.id)
  return {
    allProblems: state.problems,
    problemId
  }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchSingleProblem: (id) => dispatch(fetchSingleProblem(id)),
//         // addProblem:(problemId)=>dispatch(postProblem(problemId))
//     }
// }

export default connect(mapStateToProps, null)(SingleProblem)
