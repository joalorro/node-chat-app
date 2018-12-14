const socket = io()
socket.on('connect', function(){
	console.log('Connected');
})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function({ text, from, createdAt }){
	let formattedTime = moment(createdAt).format('h:mm a')
	const template = jQuery('#message-template').html()
	let html = Mustache.render(template, { text, from, formattedTime })
	
	jQuery('#messages').append(html)
})

socket.on('newLocMsg', function({ from, createdAt, url}){
	let formattedTime = moment(createdAt).format('h:mm a')
	const template = jQuery('#location-message-template').html()
	let html = Mustache.render(template, { from, url, formattedTime })
	
	jQuery('#messages').append(html)
})

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