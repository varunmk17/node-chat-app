var socket = io();

socket.on('connect', function () {
    console.log('connected to server');
});

socket.on('disconnect', function () {
    console.log('Oops.. connection lost');
});

socket.on('newMessage', function (message) {
    var formattedtime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedtime
    });
    jQuery('#messages').append(html);
});

socket.on('newLocationMessage', function (message) {
    var formattedtime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        from: message.from,
        createdAt: formattedtime
    });
    jQuery('#messages').append(html);
});

jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();
    
    var messageTextBox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextBox.val()
    }, function () {
        messageTextBox.val('')
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocaction not supported');
    }
    locationButton.attr('disabled', 'disabled').text('Sending location..');
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.removeAttr('disabled').text('Sending location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.removeAttr('disabled').text('Sending location');
        return alert('Unable to fetch location');
    });
});