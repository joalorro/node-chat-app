const socket = io()
socket.on('connect', function(){
	console.log('Connected');
})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function(message){
	console.log('New Message', message)
	let li = jQuery('<li></li>')
	li.text(`${message.from}: ${message.text}`)

	jQuery('#messages').append(li)
})

socket.on('newLocMsg', function(msg){
	console.log(msg)
	let li = jQuery('<li></li>')
	let a = jQuery('<a target="_blank"> My current location </a>')
	
	li.text(`${msg.from}: `)
	a.attr('href', msg.url)
	li.append(a)
	jQuery('#messages').append(li)
})

//Event Acknowledgements
// socket.emit('createMessage', {
// 	from: "frank",
// 	text: 'hi'
// }, function(data){
// 	console.log('Got it', data)
// })

jQuery('#message-form').on('submit', function(e){
	e.preventDefault()
	let messageTextbox = jQuery('[name=message]')
	socket.emit('createMessage', {
		from: 'jerboi',
		text: messageTextbox.val()
	}, function() {
		messageTextbox.val('')
	})
})

const locBtn = jQuery('#send-loc')
locBtn.on('click', function(e){
	if (!navigator.geolocation){
		return alert('Geolocation not supported by browser')
	}

	locBtn.attr('disabled', 'disabled').text('Sending location...')

	navigator.geolocation.getCurrentPosition(function(position){
		locBtn.removeAttr('disabled').text('Send location')
		console.log(position)
		const { latitude, longitude } = position.coords
		socket.emit('createLocMsg', { latitude, longitude })
	}, function(){
		locBtn.removeAttr('disabled').text('Send location')
		alert('Unable to fetch location')
	})
})