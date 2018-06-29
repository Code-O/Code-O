/* global describe beforeEach it */
import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ProblemsTable from '../../client/components/ProblemsTable'

const adapter = new Adapter()
enzyme.configure({ adapter })


describe('▒▒▒ Frontend tests ▒▒▒', () => {
	describe('Problems', () => {
		let testProblem;
		let problem = {
			id: 1,
			name: "a",
			description: "b",
			difficulty: "easy",
			hints: 'c',
			solved: false,
			userSubmission: "d",
			points: 1,
			funcName: "e"
		}

		beforeEach(() => {
			testProblem = shallow(<ProblemsTable problem={problem} />)
		})

		it('renders message in h3', () => {
			expect(testProblem.find('h3').text()).to.be.equal('Name')
		})

		it('renders 4 td tags per problem', () => {
			expect(testProblem.find('td').length).to.be.equal(4)
		})
	})
})
