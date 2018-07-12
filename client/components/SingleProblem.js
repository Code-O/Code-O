import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import { Card, CardText, CardBody, CardTitle } from 'reactstrap'
import '../styles/singleProblem.css'
import { CylinderSpinLoader } from 'react-css-loaders'

import {
  VictoryLine,
  VictoryChart,
  VictoryTheme,
  VictoryLabel,
  VictoryAxis
} from 'victory'
import { fetchSingleProblem } from '../store'

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputCode: '',
      userSubmission: '',
      hideAnswer: true,
      showLoader: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleShowAnswer = this.handleShowAnswer.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProblem(this.props.problemId)
  }

  handleChange = event => {
    this.setState({ inputCode: event })
  }

  // Makes post request to seperate dockerized server. Runs our function and return its value
  handleSubmit = event => {
    event.preventDefault()
    this.setState({ showLoader: true })
    console.log(this.state.inputCode, 'input')
    axios
      .post('https://code-o-test.herokuapp.com/secApp', {
        code: this.state.inputCode
      })
      .then(res => res.data)
      .then(problem => {
        console.log(problem, '<- from docker')
        this.setState({
          userSubmission: problem,
          showLoader: false
        })
      })
      .catch(err => console.log(err))
  }

  handleShowAnswer = () => {
    let answer = !this.state.hideAnswer
    this.setState({
      hideAnswer: answer
    })
  }

  render() {
    const { singleProblem } = this.props
    const userSubmission = this.state.userSubmission
    let graphUserSubmission = userSubmission || ''

    // Retrieves data from user submission and captures it in data sets of various sizes
    let filterNums = graphUserSubmission.match(/[+-]?\d+(\.\d+)?/g) || ['']
    let dataSet = filterNums.map(num => Number(num))
    let smallDataSet = dataSet[5] || 0
    let medDataSet = dataSet[4] || 0
    let largeDataSet = dataSet[3] || 0
    let xLargeDataSet = dataSet[2] || 0

    // Retrieves the user's result
    let returnVal = userSubmission.split('solution')[1] || ''
    let solutionValueStr = returnVal.split(' ')[1] || ''
    let solutionValue = solutionValueStr.slice(0, solutionValueStr.indexOf('m') - 1)

    // Checks if the user's solution is correct or wrong
    function check() {
      if (dataSet.length > 1 && solutionValue === singleProblem.solution) {
        return (
          <div
            style={{
              background: '#fff',
              padding: '7px',
              textAlign: 'center',
              width: '600px',
              backgroundColor: ' #00a8ff',
              margin: '0 auto',
              fontSize: '1.7em'
            }}
          >
            Success!!
          </div>
        )
      } else if (dataSet.length > 1 && solutionValue !== singleProblem.solution) {
        return (
          <div
            style={{
              background: '#fff',
              padding: '7px',
              textAlign: 'center',
              width: '600px',
              backgroundColor: '#e84118',
              margin: '0 auto',
              fontSize: '1.7em'
            }}
          >
            Sorry, please try again!!
          </div>
        )
      } else {
        return <div />
      }
    }

    return (
      <div>
        <div className="problem">
          <Card>
            <div style={{ padding: '10px', margin: '0px' }}>
              <CardBody>
                <CardTitle>{singleProblem.name}</CardTitle>
                <CardText>{singleProblem.description}</CardText>
              </CardBody>
            </div>
          </Card>
          {this.state.showLoader ? <CylinderSpinLoader /> : null}
          <div className="result">{check()}</div>
        </div>
        <div className="items">
          <div className="editor">
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={evt => this.handleChange(evt)}
              value={this.state.inputCode}
              name="UNIQUE_ID_OF_DIV"
              editorProps={{
                $blockScrolling: true
              }}
              defaultValue={`function ${singleProblem.funcName}() {\n\n}`}
            />
            <button onClick={this.handleSubmit} style={{
              margin: '20px 5px'
            }
            } type="submit">
              Submit
          </button>
            <button type="button" onClick={this.handleShowAnswer}
              style={{
                margin: '20px 10px'
              }
              }
            >
              Show Optimal Solution
            </button>
            {this.state.hideAnswer ? null : (
              <AceEditor
                mode="javascript"
                theme="monokai"
                onChange={evt => this.handleChange(evt)}
                value={singleProblem.optimalSolution}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{
                  $blockScrolling: true
                }}
              />
            )}
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
              <VictoryLabel x={130} y={30} text="Time Complexity" />
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
                data={[
                  {
                    x: 20,
                    y: smallDataSet
                  },
                  {
                    x: 100,
                    y: medDataSet
                  },
                  {
                    x: 500,
                    y: largeDataSet
                  },
                  {
                    x: 1000,
                    y: xLargeDataSet
                  }
                ]}
              />
              <VictoryAxis
                dependentAxis
                domain={[0, 7]}
                label="ms"
                style={{
                  axisLabel: {
                    padding: 40
                  }
                }}
              />
              <VictoryAxis
                label="Elements"
                style={{
                  axisLabel: {
                    padding: 30
                  }
                }}
              />
            </VictoryChart>
          </div>
        </div>
      </div >
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const problemId = Number(ownProps.match.params.id)
  return {
    singleProblem: state.problem,
    problemId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchSingleProblem: id => dispatch(fetchSingleProblem(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProblem)
