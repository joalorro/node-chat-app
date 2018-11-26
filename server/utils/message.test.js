const expect = require('expect')
const { generateMessage, generateLocMsg } = require('./message.js')

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

describe('generateLocMsg', () => {
	it('should generate the corerct location object', () => {
		const from = 'Admin'
		const lat = 15;
		const lng = 19;
		const url = 'https://google.com/maps?q=15,19'

		const res = generateLocMsg(from, lat, lng)

		expect(typeof res.url).toBe('string')
		expect(res.url).toBe(url)
		expect(typeof res.createdAt).toBe('number')
	})
})