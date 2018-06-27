import React, { Component } from 'react'
import { connect } from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import socket from '../socket'

class SingleProblem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputCode: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSumbit = this.handleSumbit.bind(this)
    }

    componentDidMount() {
        socket.emit('room', {room: this.props.problemId})
    }

    componentWillReceiveProps(nextProps) {
        socket.emit('room', {room: nextProps.problemId})
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

    handleCodeUpdateFromSockets(codePayload) {
        this.setState({inputCode: codePayload})
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
                <form onSubmit={this.handleSumbit}>
                    <strong>{singleProblem.name}</strong>
                    <br />
                    <br />
                    {singleProblem.description}
                    <br />
                    <br />
                    <button type='submit'>RUN TEST</button>
                    <br />
                    <br />
                </form>
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={this.handleChange}
                    value={this.state.inputCode}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
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
