const moment = require('moment')

const generateMessage = (from, text) => {
	return { from, text, createdAt: moment().valueOf() }
}

const generateLocMsg = (from, lat, lng) => {
	return {
		from,
		url: `https://google.com/maps?q=${lat},${lng}`,
		createdAt: moment().valueOf()
	}
}

module.exports = { generateMessage, generateLocMsg }