import React, { Component } from 'react'
import { connect } from 'react-redux'
import brace from 'brace'
import axios from 'axios'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import socket from '../socket'
import { Card } from 'react-materialize'

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis
} from 'victory'
import { fetchSingleProblem, putSingleProblem } from '../store'
import user from '../store/user';

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputCode: ''
    }

    // socket.on('receive code', payload => {
    //   this.handleCodeUpdateFromSockets(payload)
    // })
  }

  componentDidMount() {
    // socket.emit('room', {room: this.props.problemId})
    this.props.fetchSingleProblem(this.props.problemId)
  }

  // componentWillReceiveProps(nextProps) {
  //     socket.emit('room', {room: nextProps.problemId})
  // }

  // componentWillUnmount() {
  //     socket.emit('leave room', {
  //         room: this.props.problemId
  //     })
  // }
  // displayChart = () => {
  //     this.
  // }

  // componentWillUnmount() {
  //     socket.emit('leave room', {
  //         room: this.props.problemId
  //     })
  // }

  handleChange = event => {
    this.setState({ inputCode: event })
    // socket.emit('coding event', {
    //     room: this.props.problemId,
    //     newCode: event
    // })
  }

  // handleCodeUpdateFromSockets(payload) {
  //     this.setState({inputCode: payload.newCode})
  // }

  handleSumbit = event => {
    event.preventDefault()
    axios
      .post(`/api/problems/${this.props.problemId}`, {
        code: this.state.inputCode
      })
      .then(postedProblem => {
        this.props.putSingleProblem(postedProblem.id)
      })
      .catch(err => console.log(err))
  }

  render() {
    // const { allProblems, problemId } = this.props
    // let singleProblem = allProblems.filter(problem => problem.id === problemId)[0] || ''
    const { singleProblem, userSubmission } = this.props
    console.log('***userSub from Comp', userSubmission)
    let graphUserSubmission = userSubmission || ''
    let filterNums = (graphUserSubmission.match(/[+-]?\d+(\.\d+)?/g)) || ['']
  
    let dataSet = filterNums.map(num => Number(num).toFixed(0)).slice(0, 4)
    // let dataSet = 10
    let smallDataSet = dataSet[0] || 0
    let medDataSet = dataSet[1] || 0
    let largeDataSet = dataSet[2] || 0
    let xLargeDataSet = dataSet[3] || 0

    // let smallDataSet = dataSet
    // let medDataSet = dataSet
    // let largeDataSet = dataSet
    // let xLargeDataSet = dataSet

    return (
      <div>
        <div className="problem">
          <Card
            className="blue-grey darken-1"
            textClassName="white-text"
            title={singleProblem.name}
          >
            {singleProblem.description}
          </Card>
          <form
            onSubmit={this.handleSumbit}
          >
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="items">
          <div className="editor">
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={this.handleChange}
              value={this.state.inputCode}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{
                $blockScrolling: true
              }}
              defaultValue={`function ${singleProblem.funcName}() {\n\n}`}
            />
          </div>
          <div className="chart">
            <VictoryChart
              animate={{
                duration: 2000,
                onLoad: {
                  duration: 1000
                }
              }}
              theme={VictoryTheme.material}
            >
              <VictoryLabel x={130} y={30} text="Big O Complexity" />
              <VictoryLine
                interpolation="natural"
                style={{
                  data: {
                    stroke: '#c43a31'
                  },
                  parent: {
                    border: '1px solid #ccc'
                  },
                  labels: {
                    fontSize: 15
                  }
                }}
                // labels={(d) => d.x}
                // labels={d => d.y}
                data={[
                  {
                    x: xLargeDataSet,
                    y: 20
                  },
                  {
                    x: largeDataSet,
                    y: 100
                  },
                  {
                    x: medDataSet,
                    y: 200
                  },
                  {
                    x: smallDataSet,
                    y: 500
                  }
                ]}
              />
              <VictoryLine
                interpolation="natural"
                style={{
                  data: {
                    stroke: 'blue'
                  },
                  parent: {
                    border: '1px solid #ccc'
                  }
                  // labels: {
                  //     fontSize: 15
                  //   },,,
                }}
                // labels={(d) => d.x}
                // labels={(d) => d.y}
                data={[
                  {
                    x: 936,
                    y: 20
                  },
                  {
                    x: 2293,
                    y: 100
                  },
                  {
                    x: 4411,
                    y: 200
                  },
                  {
                    x: 20007,
                    y: 500
                  }
                ]}
              />
              <VictoryAxis
                label="Elements"
                style={{
                  axisLabel: {
                    padding: 30
                  }
                }}
              />
              <VictoryAxis
                dependentAxis
                label="Operations"
                style={{
                  axisLabel: {
                    padding: 40
                  }
                }}
              />
            </VictoryChart>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const problemId = Number(ownProps.match.params.id)
  console.log('+++', state.problem.userSubmission)
  return {
    singleProblem: state.problem,
    userSubmission: state.problem.userSubmission,
    problemId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProblem: id => dispatch(fetchSingleProblem(id)),
    putSingleProblem: id => dispatch(putSingleProblem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProblem)
