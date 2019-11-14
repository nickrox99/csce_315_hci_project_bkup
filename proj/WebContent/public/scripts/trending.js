//var result = localStorage.getItem('search_result', result);
var result = "";
var previousResult = "";


function getNewSearchResult() {

    // get the latest search results
    previousResult = result;
    result = localStorage.getItem('search_result', result);
}

function loadWiki() {

    console.log("loadWiki() started in trending.js");
    var request = new XMLHttpRequest();
    
    var query = result;
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="'+ result + '&format=json&callback=?&origin=*';
    request.open('GET', url, true);

    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    request.onload = function () {

        // access JSON data
        //var data = JSON.parse(request.responseText)

        console.log(request.response);

        if (request.status >= 200 && request.status < 400) {
            data.forEach(text => {
                console.log(text)
            })
        } else {
            console.log('error')
        }
    }
    request.send();

// document.getElementById("wiki_summary").innerHTML = context;

}

function loadTwitter() 
{

    /** Twitter API Authorization parameters 
    * Parameters: https://developer.twitter.com/en/docs/basics/authentication/guides/authorizing-a-request
    * Percent Encoding: https://developer.twitter.com/en/docs/basics/authentication/guides/percent-encoding-parameters
    * oauth_consumer_key - BdEEDfBrbO9QGPXAYJ3XbRCEZ
    * oauth_nonce - randomly generated String
    * oauth_signature - we must generate this signature
    * oauth_signature_method - HMAC-SHA1
    * oauth_timestamp - unix time of request
    * oauth_token - 2255316103-q9bK11fXyV9gblZQasqEfLi2Ob6jrhrnewQE6F3
    * oauth_version - 1.0
    */

    console.log("loadTwitter() started in trending.js");
    var request = new XMLHttpRequest();
    
    var query = result;
    var url = '"&format=json&callback=?&origin=*';
    request.open('GET', url, true);

    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    request.onload = function () {

        // access JSON data
        //var data = JSON.parse(request.responseText)

        console.log(request.response);

        if (request.status >= 200 && request.status < 400) {
            data.forEach(text => {
                console.log(text)
            })
        } else {
            console.log('error')
        }
    }
    request.send();

// document.getElementById("wiki_summary").innerHTML = context;

}

function loadPage() {
    if (result != null) {
        // load based off the user search
    }
    var sourceT = "profile";
    var screenN = "jack";
    // load a default shell
}


function showDate() {
    var d = new Date();
    var n = d.toDateString();
    document.getElementById("date").innerHTML = n;

}

window.onload = (function () {
    
    var tweet = document.getElementById("tweet");
    var tweet_id = tweet.getAttribute("tweetID");

    // not working properly
    getNewSearchResult();

    // load page shoiuld work
    loadPage();

    // show date works
    showDate();

    // load wiki currently prints JSON to the console, we need to parse and display this
    loadWiki();

    // loads a specific user's tweet timeline
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

    console.log("result: " + result);
    console.log("previousResult: " + previousResult);
});
