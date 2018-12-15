const socket = io()

const scrollToBottom = function(){
	// Selectors 
	const messages = jQuery('#messages')
	const newMessage = messages.children('li:last-child')

	// Heights
	const clientHeight = messages.prop('clientHeight')
	const scrollTop = messages.prop('scrollTop')
	const scrollHeight = messages.prop('scrollHeight')
	const newMessageHeight = newMessage.innerHeight()
	const lastMessageHeight= newMessage.prev().innerHeight()

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
		messages.scrollTop(scrollHeight)
	}
}

socket.on('connect', function(){
	console.log('Connected');
	const params = jQuery.deparam(window.location.search)
	socket.emit('join', params, function(err){
		if (err){
			alert(err)
			window.location.href = '/'
		} else {
			console.log('no error')
		}
	})
})

socket.on('disconnect', function(){
	console.log('Disconnected from server')
})

socket.on('newMessage', function({ text, from, createdAt }){
	let formattedTime = moment(createdAt).format('h:mm a')
	const template = jQuery('#message-template').html()
	let html = Mustache.render(template, { text, from, formattedTime })
	
	jQuery('#messages').append(html)
	scrollToBottom()
})

socket.on('newLocMsg', function({ from, createdAt, url}){
	let formattedTime = moment(createdAt).format('h:mm a')
	const template = jQuery('#location-message-template').html()
	let html = Mustache.render(template, { from, url, formattedTime })
	
	jQuery('#messages').append(html)
	scrollToBottom()
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