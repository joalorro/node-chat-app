const expect = require('expect')
const { Users } = require('./users')

describe('the users class', () => {
	
	let users
	beforeEach( () => {
		users = new Users()
		users.users = [
			{ id: 1, name: 'Frank', room: 'Blonded' },
			{ id: 2, name: 'SZA', room: 'Blonded' },
			{ id: 3, name: 'Hozier', room: 'Wine' }
		]
	})

	it('should add new user', () => {
		const user = { id: 1, name: 'Frank', room: 'Blonded'}
		expect(users.addUser(user.id, user.name, user.room)).toEqual(user)
	})

	it('should find a user', () => {
		expect(users.getUser(3)).toEqual({ id:3, name: 'Hozier', room: 'Wine' })
	})

	it('should remove a user', () => {
		const user = users.removeUser('1')
		expect(user).toEqual({ id: 1, name: 'Frank', room: 'Blonded'})
		expect(users.users).toEqual([
			{ id: 2, name: 'SZA', room: 'Blonded' },
			{ id: 3, name: 'Hozier', room: 'Wine' }
		])
	})

	it('should not remove a user', () => {
		expect(users.removeUser(0)).toBeFalsy()
	})

	it('should get a list of users', () => {
		const userList = ['Frank', 'SZA']
		expect(users.getUserList('Blonded')).toEqual(userList)
	})
})