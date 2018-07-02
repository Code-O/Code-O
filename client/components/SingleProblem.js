import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

import socket from '../socket'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'
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
      userSubmission: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
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
      .then(res=>res.data)
      .then(problem=>{
        this.setState({
          userSubmission: problem.userSubmission
        })
      })
      .catch(err => console.log(err))
  }

  render() {
    const { singleProblem } = this.props
    const userSubmission = this.state.userSubmission
    let graphUserSubmission = userSubmission || ''
    let filterNums = (graphUserSubmission.match(/[+-]?\d+(\.\d+)?/g)) || ['']
  
    let dataSet = filterNums.map(num => Number(num).toFixed(0)).slice(0, 4)
    let smallDataSet = dataSet[0]
    let medDataSet = dataSet[1]
    let largeDataSet = dataSet[2]
    let xLargeDataSet = dataSet[3]

    return (
      <div>
        <div className="problem">
          <Card>
            <div style={{padding: '10px', margin: '0px'}}>
              <CardBody>
                <CardTitle>{singleProblem.name}</CardTitle>
                <CardText>{singleProblem.description}</CardText>
              </CardBody>
            </div>
          </Card>
          {/* <Card
            className="blue-grey darken-1"
            textClassName="white-text"
            title={singleProblem.name}
          >
            {singleProblem.description}
          </Card> */}
          <form
            onSubmit={this.handleSubmit}
          >
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="items">
          <div className="editor">
            <AceEditor
              mode="javascript"
              theme="monokai"
              onChange={(evt) => this.handleChange(evt)}
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
                }}
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
