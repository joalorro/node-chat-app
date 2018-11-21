const expect = require('expect')
const { generateMessage } = require('./message.js')

describe('generateMessage', () => {
	it('should generate the correct message object', () => {
		const from = 'user'
		const text = 'hello'
		const createdAt = new Date().getTime()
		const res = generateMessage(from, text)

		expect(typeof res.from).toBe('string')
		expect(typeof res.text).toBe('string')
		expect(typeof res.createdAt).toBe('number')

		expect(res).toMatchObject({ from, text, createdAt })
	})
})