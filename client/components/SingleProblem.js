import React, { Component } from 'react'
import { connect } from 'react-redux'
import brace from 'brace'
import AceEditor from 'react-ace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

class SingleProblem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            code: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = event => {
        console.log("--->", event)
        // this.setState({
        //     code: event
        // })
    }
    render() {
        const { allProblems, problemId } = this.props
        let singleProblem = allProblems.filter(problem => problem.id === problemId)[0] || ''
        return (

            <div>
                {singleProblem.name}
                <br />
                <br />
                {singleProblem.description}
                <br />
                <br />
                <AceEditor
                    mode="javascript"
                    theme="monokai"
                    onChange={this.handleChange}
                    value={``}
                    name="UNIQUE_ID_OF_DIV"
                    editorProps={{ $blockScrolling: true }}
                />
                <button type="submit" onSubmit={this.handleChange()}>Submit</button>
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
