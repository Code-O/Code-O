import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {Card, CardText, CardBody, CardTitle} from 'reactstrap'
import '../styles/singleProblem.css'

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
      hideAnswer: true
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

  handleSubmit = event => {
    event.preventDefault()
    axios
      .post(`/api/problems/${this.props.problemId}`, {
        code: this.state.inputCode
      })
      .then(res => res.data)
      .then(problem => {
        this.setState({
          userSubmission: problem.userSubmission
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
    let filterNums = graphUserSubmission.match(/[+-]?\d+(\.\d+)?/g) || ['']

    let dataSet = filterNums.map(num => Number(num))
    console.log('userSubmission',userSubmission)
    console.log('filterNums', filterNums)
    console.log('***', dataSet)
    let smallDataSet = dataSet[3] || 0
    let medDataSet = dataSet[2] || 0
    let largeDataSet = dataSet[1] || 0
    let xLargeDataSet = dataSet[0] || 0
    
    

    function check() {
      if (dataSet.length > 1 && solutionValue === singleProblem.solution) {
        return (
          <div
            style={{
              background: '#fff',
              padding: '7px',
              textAlign: 'center'
            }}
          >
            Success!!
          </div>
        )
      } else if (dataSet.length > 1) {
        return (
          <div
            style={{
              background: '#fff',
              padding: '7px',
              textAlign: 'center'
            }}
          >
            Too Bad!!
          </div>
        )
      } else {
        return <div />
      }
    }
    let solutionValue = userSubmission
      .split(' ')[1]
      // .slice(-4)
      // .toString()
    
    console.log('userSubmission **',userSubmission)
    console.log('work', dataSet, solutionValue)
    
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
          <button onClick={this.handleSubmit} type="submit">
            Submit
          </button>
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

            <button type='button' onClick={this.handleShowAnswer}>Show Optimal Solution</button>
            {this.state.hideAnswer ? null :
              (<AceEditor
                mode="javascript"
                theme="monokai"
                onChange={evt => this.handleChange(evt)}
                value={singleProblem.optimalSolution}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{
                  $blockScrolling: true
                }}
              />)
            }

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
              <VictoryLabel x={130} y={30} text="Big time Complexity" />
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
              {/* <VictoryLine
                interpolation="natural"
                style={{
                  data: {
                    stroke: 'blue'
                  },
                  parent: {
                    border: '1px solid #ccc'
                  }
                }}
                data={[
                  {
                    x: 20007,
                    y: 20
                  },
                  {
                    x: 4411,
                    y: 100
                  },
                  {
                    x: 2293,
                    y: 200
                  },
                  {
                    x: 936,
                    y: 500
                  }
                ]}
              /> */}
              <VictoryAxis
              dependentAxis
                label="ms"
                style={{
                  axisLabel: {
                    padding: 30
                  }
                }}
              />
              <VictoryAxis
                
                label="Elements"
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