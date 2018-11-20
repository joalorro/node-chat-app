const path = require('path')
const express = require('express')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000
const app = express()

// configuring to find middleware
app.use(express.static(publicPath))

app.listen(process.env.PORT || 3000, () => {
	console.log('Server is now running on: ' + port);
})