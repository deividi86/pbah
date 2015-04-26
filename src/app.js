var UI = require('ui');
var ajax = require('ajax');
var Vibe = require('ui/vibe');
var Light = require('ui/light');
var twettId = '';

// Construct URL
var URL = 'https://api.twitter.com/1.1/search/tweets.json?q=%40AngelHack';

// Create a Card with title and subtitle
var card = new UI.Card({
  title:'@AngelHack',
  scrollable: true
});

var fetchTweets = function(){
  ajax(
    {
      url: URL,
      type: 'json',
      crossDomain: true,
      headers: { 'Authorization': 'OAuth oauth_consumer_key="DC0sePOBbQ8bYdC8r4Smg",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1430071461",oauth_nonce="2464372803",oauth_version="1.0",oauth_token="21090358-RquisURH9ffbUXhhbCGfuvEzNWqfy9DakiFiphWQN",oauth_signature="2xMhAfpBVcm1kotjPP0grBBRQeY%3D"'}
    },
    function(data) {
      // Success!
      console.log("Successfully fetched twitter timeline!");
      
      if(twettId != data.statuses[0].id) {
        console.log("A new tweet about @AngelHack has been found.");
        
        twettId =  data.statuses[0].id;
        
        var tweetText = '';
        // Show to user
        for(var i = 0; i< 10; i++){
          if(i !== 10){
           tweetText += '@'+data.statuses[i].user.screen_name + ': ' + data.statuses[i].text + '\n\n';
          } else {
            tweetText += '@'+data.statuses[i].user.screen_name + ': ' + data.statuses[i].text;
          }
          
          card.body(tweetText);
        }
        Light.trigger();
        Vibe.vibrate('short');
      }
      
      
    },
    function(error) {
      console.log('Failed fetching twitter timeline: ' + error);
    }
  );
  card.show();
};

fetchTweets();

// Make the request every minute
setInterval(function(){
  fetchTweets();
}, 1000 * 60);


