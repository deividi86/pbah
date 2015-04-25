var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'AngelHack Timeline'
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
      type: 'json',
      crossDomain: true,
      headers: { 'Authorization': 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1429997754",oauth_nonce="2739203158",oauth_version="1.0",oauth_token="21090358-RquisURH9ffbUXhhbCGfuvEzNWqfy9DakiFiphWQN",oauth_signature="ZqdQRd20o8wFlmAqjiFOU33wzDQ%3D"'}
    },
    function(data) {
      // Success!
      console.log("Successfully fetched twitter timeline!");
      console.log(data.statuses[0].text);
  
      // Always upper-case first letter of description
      var description = data.statuses[0].text;
      description = description.charAt(0).toUpperCase() + description.substring(1);
  
      // Show to user
      card.body(description);
    },
    function(error) {
      console.log('Failed fetching twitter timeline: ' + error);
    }
  );
}, 1000 * 15);
