var UI = require('ui');
var ajax = require('ajax');

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'AngelHack Mentions'
});

// Construct URL
var URL = 'https://api.twitter.com/1.1/search/tweets.json?q=%40AngelHack';

// Make the request every minute
setInterval(function(){
  ajax(
    {
      url: URL,
      type: 'json',
      crossDomain: true,
      headers: { 'Authorization': 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1430024339",oauth_nonce="1330515815",oauth_version="1.0",oauth_token="21090358-RquisURH9ffbUXhhbCGfuvEzNWqfy9DakiFiphWQN",oauth_signature="AXXNIKeDtljwMplgvZX3cWgwUOI%3D"'}
    },
    function(data) {
      // Success!
      console.log("Successfully fetched twitter timeline!");
      var tweet = data.statuses[0].text;
      // Show to user
      card.body(tweet);
    },
    function(error) {
      console.log('Failed fetching twitter timeline: ' + error);
    }
  );
  // Display the Card
  card.show();
}, 1000 * 5);
