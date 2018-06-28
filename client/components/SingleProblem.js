import React, { Component } from 'react'
import { connect } from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import socket from '../socket'
import { Button, Icon, Col, Card, CardTitle, Badge } from 'react-materialize'


class SingleProblem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputCode: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
        socket.on('receive code', (payload) => {
            this.handleCodeUpdateFromSockets(payload)
        })
    }

    componentDidMount() {
        socket.emit('room', { room: this.props.problemId })
    }

    componentWillReceiveProps(nextProps) {
        socket.emit('room', { room: nextProps.problemId })
    }

    componentWillUnmount() {
        socket.emit('leave room', {
            room: this.props.problemId
        })
    }

    handleChange = event => {
        this.setState({
            inputCode: event
        })
        socket.emit('coding event', {
            room: this.props.problemId,
            newCode: event
        })
    }

    handleCodeUpdateFromSockets(payload) {
        this.setState({ inputCode: payload.newCode })
    }

    handleSumbit = event => {
        event.preventDefault();
        console.log(this.state.inputCode)
    }

    render() {
        const { allProblems, problemId } = this.props
        let singleProblem = allProblems.filter(problem => problem.id === problemId)[0] || ''
        return (
            <div>
                <Card
                    className='blue-grey darken-1'
                    textClassName='white-text'
                    title={singleProblem.name}
                >

                    {singleProblem.description}
                </Card>
                <form onSubmit={this.handleSumbit}>
                    <button type='submit'>RUN TEST</button>
                </form>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={this.handleChange}
                    value={this.state.inputCode}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                    defaultValue={`function ${singleProblem.funcName}() {\n\n}`}
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

export default connect(
    mapStateToProps,
    null,
)(SingleProblem)
