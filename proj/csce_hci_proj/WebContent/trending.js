var result = "";
var previousResult = "";

window.onload = (function(){

    var tweet = document.getElementById("tweet");
    var id = tweet.getAttribute("tweetID");

    twttr.widgets.createTweet(
      id, tweet, 
      {
        conversation : 'none',    // or all
        cards        : 'hidden',  // or visible 
        linkColor    : '#cc0000', // default is blue
        theme        : 'dark', 
        alight       : 'center',
           // or dark
      })
    .then (function (el) {
      el.contentDocument.querySelector(".footer").style.display = "none";
    });

  });

  function fetchTweets(q) {

    var yql  = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20json%20where%20url%3D%22";
    var base = "https://twitter.com/i/search/timeline?f=realtime&src=typd&include_entities=0&q=";
  
    // Test the URL in YQL console to make sure it works
    var url  = yql + base + encodeURIComponent(q) + "%22&format=json";
  
     // Make synchronous AJAX request to yql
    var tweets = jQuery.ajax({type: "GET", url: url, dataType: 'json', async: false }).responseText;
  
    // Parse the JSON response
    var data = JSON.parse(tweets);
  
    // Return the HTML search results
    return data.query.results.json.items_html;
    
  }

  function getUserSearch()
  {
      // get the user search from the homepage and put it in the globle variable
      var searchInput = document.getElementById('search_field').nodeValue;
      result = searchInput;

  }

  function loadWiki()
  {
      // load Wikipedia data
  }

  twttr.widgets.createTimeline(
    {
      sourceType: "profile",
      screenName: "jack"
    },
    document.getElementById("tweetTimeline"),
    {
      height: "auto",
      chrome: "nofooter",
      linkColor: "#820bbb",
      borderColor: "#a80000"
    }
  );