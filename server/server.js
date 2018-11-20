const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
// const server = http.createServer( app )
// const io = socketIO(server)

// configuring to find middleware
app.use(express.static(publicPath))

// app.listen(process.env.PORT || 3000, () => {
// 	console.log('Server is now running on: ' + port);
// })

const server = app.listen(process.env.PORT || 3000, () => {
	console.log('Server is now running on: ' + port);
})
const io = socketIO(server)