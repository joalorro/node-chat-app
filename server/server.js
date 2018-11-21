const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer( app )
const io = socketIO(server)

// configuring to find middleware
app.use(express.static(publicPath))

// io is the connection between the server and all connections

io.on('connection', (socket) => {
	// socket is the connection to a single client
	
	console.log('New user connected')

	socket.on('disconnect', () => {
		console.log('User lost');
	})

	socket.on('createMessage', (message) => {
		console.log(message);
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})
	})
})

server.listen(port, () => {
	console.log('Server is now running on: ' + port);
})