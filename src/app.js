var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'AngelHack Timeline',
  subtitle:'Fetching tweets...'
});

// Display the Card
card.show();

// Construct URL
var key = 'key';
var URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=angelhack&count=1' + key;

// Make the request every minute
setInterval(function(){
  ajax(
    {
      url: URL,
      type: 'json'
    },
    function(data) {
      // Success!
      console.log("Successfully fetched twitter timeline!");
      console.log(data);
  
      // Always upper-case first letter of description
      var description = data.description;
      description = description.charAt(0).toUpperCase() + description.substring(1);
  
      // Show to user
      card.body(description);
    },
    function(error) {
      console.log('Failed fetching twitter timeline: ' + error);
    }
  );
}, 1000 * 15);
