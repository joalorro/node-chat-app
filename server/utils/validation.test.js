const expect = require('expect')
const { isRealString } = require('./validation')

describe('isRealString validation function', () =>{
	it('rejects non-string values', () => {
		expect(isRealString(69)).toBe(false)
	})
	it('rejects strings with only spaces', () => {
		expect(isRealString('  ')).toBe(false)
	})
})