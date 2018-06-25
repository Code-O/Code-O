import React, { Component } from 'react'
import { Navbar } from './components'
import Routes from './routes'
import store, { fetchProblems } from './store'

export default class App extends Component {
  componentDidMount() {
    const problemsThunk = fetchProblems()
    store.dispatch(problemsThunk)
    console.log('app is working')
  }
  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

