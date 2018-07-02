import axios from 'axios'

/**
 * ACTION TYPES
 */

const GET_SINGLE_PROBLEM = 'GET_SINGLE_PROBLEM'

/**
 * ACTION CREATORS
 */

const getSingleProblem = problem => ({type: GET_SINGLE_PROBLEM, problem})

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

//Reducer
export default function(state = {}, action) {
  switch (action.type) {
    case GET_SINGLE_PROBLEM: {
      return action.problem
    }

    default: {
      return state
    }
  }
}
