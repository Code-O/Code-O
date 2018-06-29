/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {fetchProblems} from '../../client/store/problems'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thunk creators', () => {
  let store
  let mockAxios

  const initialState = {problems: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('problems', () => {
    it('eventually dispatches the GET Problem action', () => {
      const fakeProblem = [{name: 'Cody\'s Problem'}, {name: 'Jack\'s Problem'}]
      mockAxios.onGet('/api/problems').replyOnce(200, fakeProblem)
      return store.dispatch(fetchProblems())
        .then(() => {
          const actions = store.getActions()
          expect(actions[0].type).to.be.equal('GET_PROBLEMS')
          expect(actions[0].problems).to.be.deep.equal(fakeProblem)
        })
    })
  })
})
