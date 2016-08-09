var username = window.location.search.split('=')[1];
// if (username.indexOf('%20') > -1) {
//   username = username.split('%20').join(' ');
// }


var message;

var app = {
  server: 'https://api.parse.com/1/classes/messages'
};

app.init = function () {
  $('.user').text(username);
  message = {
    username: username,
    text: $('#message').val(),
    roomname: $('#roomSelect').val()
  };
};

app.send = function (message) {
  $.ajax({
    url: app.server,
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('Successfully sent msg!');
    }, 
    error: function (data) {
      console.log('Failed to send message:', data);
    }
  });

};

app.fetch = function () {
  $.ajax({
  // This is the url you should use to communicate with the parse API server.
    url: app.server,
    type: 'GET',
    //data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      data.results.forEach(function(message) {
        var $text = message.username + ': ' + message.text;
        var $message = $('<div></div>').text($text);
        
        // console.log(message)
        $('#chats').append($message);
      });
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.clearMessages = function () {
  $('#chats').empty();
};
app.addMessage = function (message) {
  var $text = message.username + ': ' + message.text;
  var $message = $('<div></div>').text($text);
  $('#chats').append($message); 
};

app.addRoom = function (room) {
  var $room = $('<option value="' + room + '"></option>').text(room);
  $('#roomSelect').append($room); 
};

setInterval(app.fetch(), 500);
// $.ajax({
//   // This is the url you should use to communicate with the parse API server.
//   url: 'https://api.parse.com/1/classes/messages',
//   type: 'GET',
//   // data: JSON.stringify(),
//   contentType: 'application/json',
//   success: function (data) {
//     data.results.forEach(function(message) {
//       var $text = message.username + ': ' + message.text;
//       var $message = $('<div></div>').text($text);
      
//       // console.log(message)
//       $('#chats').append($message);
//     });
//     console.log('chatterbox: Messages recieved');
//   },
//   error: function (data) {
//     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
//     console.error('chatterbox: Failed to send message', data);
//   }
// });

