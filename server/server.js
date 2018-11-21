const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const app = express()
const server = http.createServer( app )
const io = socketIO(server)

const { generateMessage } = require('./utils/message.js')

// configuring to find middleware
app.use(express.static(publicPath))

// io is the connection between the server and all connections

io.on('connection', (socket) => {
	// socket is the connection to a single client
	console.log('New user has joined')
	socket.on('disconnect', () => {
		console.log('User disconnected');
	})

	// Greeting the new user who joined and notifying other users of who joined
	socket.emit('newUser', generateMessage('Admin', 'Welcome to the Chat App'))

	socket.broadcast.emit('newUser', generateMessage('Admin', 'A new user has joined!'))	

	socket.on('createMessage', (message) => {
		console.log(message);
		// emitting event to ALL connections

		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime()
		})

		// broadcast emits to all other connections except to the origin signal
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createAt: new Date().getTime()
		// })

	})
})

server.listen(port, () => {
	console.log('Server is now running on: ' + port);
})