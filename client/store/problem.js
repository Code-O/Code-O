import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */

const GET_SINGLE_PROBLEM = 'GET_SINGLE_PROBLEM'
const UPDATE_SINGLE_PROBLEM = 'UPDATE_SINGLE_PROBLEM'

/**
 * ACTION CREATORS
 */

const getSingleProblem = problem => ({type: GET_SINGLE_PROBLEM, problem})
const updateSingleProblem = problem => ({type: UPDATE_SINGLE_PROBLEM, problem})

/**
 * THUNK CREATORS
 */

export const fetchSingleProblem = problemId => {
  return dispatch => {
    axios
      .get(`/api/problems/${problemId}`)
      .then(res => res.data)
      .then(singleProblem => {
        dispatch(getSingleProblem(singleProblem))
      })
      .catch(console.error)
  }
}

export const putSingleProblem = problemId => {
  return dispatch => {
    axios
      .get(`/api/problems/${problemId}`)
      .then(res => res.data)
      .then(singleProblem => {
        dispatch(updateSingleProblem(singleProblem))
      })
      .catch(console.error)
  }
}


//Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PROBLEM: {
      return action.problem
    }

    case UPDATE_SINGLE_PROBLEM: {
      console.log('from store**', action.problem.userSubmission)
      return {...state, userSubmission:action.problem.userSubmission}
    }

    default: {
      return state
    }
  }
}
