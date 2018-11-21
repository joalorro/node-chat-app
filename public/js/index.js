
const socket = io()
socket.on('connect', function(){
	console.log('Connected to server')
})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
	console.log(message)
})
const handleClick = () => {
	socket.emit('createMessage', {
		from: 'jerboi',
		text: input.value
	})
}
const input = document.querySelector('input')
document.querySelector('#but').addEventListener('click', handleClick)
