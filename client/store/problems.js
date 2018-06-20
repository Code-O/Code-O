// import axios from 'axios'
// import history from '../history'

// /**
//  * ACTION TYPES
//  */
// const GET_PROBLEMS = 'GET_PROBLEMS'
// const ADD_PROBLEM = 'ADD_PROBLEM'
// const UPDATE_PROBLEM = 'UPDATE_PROBLEM'
// const REMOVE_PROBLEM = 'REMOVE_PROBLEM'

// /**
//  * INITIAL STATE
//  */
// const defaultUser = []

// /**
//  * ACTION CREATORS
//  */
// const getProblems = problems => ({type: GET_PROBLEMS, problems})
// const addProblems = problem => ({type: ADD_PROBLEM, problem})
// const updateProblems = problem => ({type: UPDATE_PROBLEM, problem})
// const removeProblems = problem => ({type: REMOVE_PROBLEM, problem})

/**
 * THUNK CREATORS
 */
// export const me = () => dispatch =>
//   axios
//     .get('/auth/me')
//     .then(res => dispatch(getUser(res.data || defaultUser)))
//     .catch(err => console.error(err))

// export const auth = (email, password, method) => dispatch =>
//   axios
//     .post(`/auth/${method}`, {email, password})
//     .then(
//       res => {
//         dispatch(getUser(res.data))
//         history.push('/home')
//       },
//       authError => {
//         // rare example: a good use case for parallel (non-catch) error handler
//         dispatch(getUser({error: authError}))
//       }
//     )
//     .catch(dispatchOrHistoryErr => console.error(dispatchOrHistoryErr))

// export const logout = () => dispatch =>
//   axios
//     .post('/auth/logout')
//     .then(_ => {
//       dispatch(removeUser())
//       history.push('/login')
//     })
//     .catch(err => console.error(err))

// /**
//  * REDUCER
//  */
// export default function(state = defaultUser, action) {
//   switch (action.type) {
//     case GET_USER:
//       return action.user
//     case REMOVE_USER:
//       return defaultUser
//     default:
//       return state
//   }
// }
