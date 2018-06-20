import React, {Component} from 'react'
// import {connect} from 'react-redux'

const problems = [
  {id: 1, name: 'fizzbuzz', description: 'fizzbuzz problem'},
  {id: 2, name: 'first number', description: 'first number problem'},
  {id: 3, name: 'duplicates', description: 'duplicates problem'},
  {id: 4, name: 'sum', description: 'sum problem'},
  {id: 5, name: 'random', description: 'random problem'}
]

export default class Problems extends Component {
  render() {
    // const {problems} = this.props
    return (
      <div style={{backgroundColor: 'skyblue'}}>
        {problems.map(prob => {
          return (
            <div key={prob.id}>
              <h2>{prob.name}</h2>
              <div>
                <p>{prob.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

// const mapState = state => {
//   return {
//     problems: state.problems
//   }
// }

// export default connect(mapState)(Problems)
