var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'AngelHack Timeline'
});

// Construct URL
var URL = 'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=angelhack&count=1';

// Make the request every minute
setInterval(function(){
  ajax(
    {
      url: URL,
      type: 'json',
      crossDomain: true,
      headers: { 'Authorization': 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1430021176",oauth_nonce="2019906746",oauth_version="1.0",oauth_token="21090358-RquisURH9ffbUXhhbCGfuvEzNWqfy9DakiFiphWQN",oauth_signature="RmWAWhGIyT3t45bdjBfM1bI%2FCCo%3D"'}
    },
    function(data) {
      // Success!
      console.log("Successfully fetched twitter timeline!");
      var tweet = JSON.stringify(data).replace('statuses: ','');
      tweet.replace('[','');
      tweet.replace(']','');
      // Show to user
      card.body(JSON.parse(tweet).text);
    },
    function(error) {
      console.log('Failed fetching twitter timeline: ' + error);
    }
  );
  // Display the Card
  card.show();
}, 1000 * 5);
