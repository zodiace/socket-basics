var name = getQueryVariable('name') || 'anonymous';
var room = getQueryVariable('room');
var socket = io();
var moment = moment();

socket.on('connect', function () {
	console.log('Connected to socket.io server')

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

var $room = jQuery('.chat-room');
$room.append(room);

socket.on('message', function (message) {
	var timestamp = moment.utc(message.timestamp);
	var $messages = jQuery('.messages');
	var $message = jQuery('<li class="list-group-item"></li>');

	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + timestamp.local().format('h:mma') + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
	$messages.append($message);
})

// Handles submitting of new event
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
	$message.focus();
});