var result = "";
var previousResult = "";

// Facebook API looks for this function on load
window.fbAsyncInit = function () {
    //FB JavaScript SDK configuration and setup
    FB.init({
        appId: '1234567890', //FB App ID
        cookie: true,  //enable cookies to allow the server to access the session
        xfbml: true,  //parse social plugins on this page
        version: 'v3.2' //use this graph api version 3.2
    });
}

function getNewSearchResult() {

    // get the latest search results
    previousResult = result;
    result = localStorage.getItem('search_result', result);
}

function loadWiki() {

    console.log("loadWiki() started in trending.js");
    var request = new XMLHttpRequest();

    var query = result;
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="' + result + '&format=json&callback=?&origin=*';
    request.open('GET', url, true);

    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");

    request.onload = function () {

        // access JSON data
        //var data = JSON.parse(request.responseText)

        console.log(request.response);
    }
    request.send();

    // document.getElementById("wiki_summary").innerHTML = context;

}

function loadTwitter() {

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

function loadTwitterTimeline() {

    var sourceT;
    var screenN
    if (result != null) {
        // load based off the user search
        sourceT = "profile";
        screenN = result;

        // loads a specific user's tweet timeline
        twttr.widgets.createTimeline(
            {
                sourceType: "profile",
                screenName: screenN
           },
            document.getElementById("tweetTimeline"),
            {
                height: "auto",
                chrome: "nofooter",
                linkColor: "#820bbb",
                borderColor: "#a80000"
            }
        );
    }
    else {
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
        // load a default shell
    }
}


function showDate() {
    var d = new Date();
    var n = d.toDateString();
    document.getElementById("date").innerHTML = n;

}

function loadFinance(){

    var request = new XMLHttpRequest();
    var symbol = 'DJI';
    var apiKey = '0SE9COWFX0MGZGAE';
    var functionStockGeneral = 'GLOBAL_QUOTE';
    var interval = '1min';
    var url = 'https://www.alphavantage.co/query?function=' + functionStockGeneral + '&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey + '&format=json&callback=?&origin=*';

    request.open('GET', url, true);
    request.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
    request.onload = function () {

        console.log(request.response);
    }
    request.send();
}


window.onload = (function () {

    //var tweet = document.getElementById("tweet");
    //var tweet_id = tweet.getAttribute("tweetID");

    // not working properly
    getNewSearchResult();



    // show date works
    showDate();

    // load wiki currently prints JSON to the console, we need to parse and display this
    //loadWiki();


    // load page shoiuld work
    //loadTwitterTimeline();

    // loadTweets();

    const wikiInfoLocation = document.querySelector('#wiki_summary');
    ReactDOM.render(e(wikiInfo),wikiInfoLocation); 

    const financeInfoLocation = document.querySelector('#finance_summary');
    ReactDOM.render(e(financeInfo),financeInfoLocation);

    const twitterInfoLocation = document.querySelector('#tweets');
    ReactDOM.render(e(twitterInfo),twitterInfoLocation);

    const sentimentInfoLocation = document.querySelector('#sentiment');
    ReactDOM.render(e(sentimentInfo),sentimentInfoLocation);

    loadFinance();




    console.log("result: " + result);
    console.log("previousResult: " + previousResult);
});
