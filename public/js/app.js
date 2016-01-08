var socket = io();
var moment = moment();

socket.on('connect', function () {
	console.log('Connected to socket.io server')
});

socket.on('message', function (message) {
	var timestamp = moment.utc(message.timestamp);

	console.log('New message:');
	console.log(message.text);

	jQuery('.messages').append('<p><strong>' + timestamp.local().format('h:mma') + '</strong> - ' + message.text + '</p>');
})

// Handles submitting of new event
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
	$message.focus();
});