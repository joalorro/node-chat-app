
const socket = io()
socket.on('connect', function(){
	console.log('Connected to server')

	socket.emit('createMessage', {
		user: 'shoboi',
		content: 'sup from the front'
	})
})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
	console.log(message)
})

const handleClick = () => {
	socket.emit('createMessage', {
		user: 'jerboi',
		content: 'saaaah'
	})
}

document.querySelector('#but').addEventListener('click', handleClick)
