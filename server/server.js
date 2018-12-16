const path = require('path')
const http = require('http')
const express = require('express')
const socketIO = require('socket.io')

const publicPath = path.join(__dirname, '../public')
const port = process.env.PORT || 3000

const { generateMessage, generateLocMsg } = require('./utils/message.js')
const { isRealString } = require('./utils/validation')
const { Users } = require('./utils/users')

const app = express()
const server = http.createServer( app )
const io = socketIO(server)
const users = new Users()

// configuring to find middleware
app.use(express.static(publicPath))

// io is the connection between the server and all connections

io.on('connection', (socket) => {
	// Greeting the new user who joined and notifying other users of who joined
	socket.on('join', ({ name, room }, callback) => {
		console.log(`${name} has joined the room ${room}`)
		if (!isRealString(name) || !isRealString(room) ){
			return callback('Name and room name are required.')
		}

		socket.join(room)
		// remove user if they are already in a room while trying to join a new one
		users.removeUser(socket.id)
		users.addUser(socket.id, name, room)

		io.to(room).emit('updateUserList', users.getUserList(room))

		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'))
		// tell the other people in the room that someone new has joined
		socket.broadcast.to(room).emit('newMessage', generateMessage('Admin', `${name} has joined!`))	
		
		
		callback()
	})

	// socket is the connection to a single client
	socket.on('disconnect', () => {
		const user = users.removeUser(socket.id)
		if (user) {
			// when someone leaves, we update the list and notify the room of their departure
			io.to(user.room).emit('updateUserList', users.getUserList(user.room))
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room.`))

		}
	})

	socket.on('leave', ({ name, room }, callback) => {

	})

	socket.on('createMessage', (message, callback) => {
		console.log(message);
		io.emit('newMessage', generateMessage(message.from, message.text))
		if (callback) callback('')
	})

	socket.on('createLocMsg', ({ latitude, longitude }) => {
		console.log(latitude)
		console.log(longitude)
		io.emit('newLocMsg', generateLocMsg('Admin', latitude, longitude ))
	})

})

server.listen(port, () => {
	console.log('Server is now running on: ' + port);
})

// io.emit emits to everyone connected 
		// io.to('office').emit => sends an event to everyone connected to the room 'office'

// socket.broadcast.emit => sends messages to everyone connected to the server except to the current user 
		// socket.broadcast.to('office') => sends messages to everyone in the room except the person making the api call
// socket.emit => sends to a specific person