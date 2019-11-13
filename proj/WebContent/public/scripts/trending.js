var result = "";
var previousResult = "";


function getNewSearchResult() {
    previousResult = result;
    result = localStorage.getItem('submit_result', result);
}

function loadWiki() {

    console.log("loadWiki() started in trending.js");
    // load Wikipedia data
    //var query = result;
    var request = new XMLHttpRequest();
    var query = "english";
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} + "&format=json + &origin=*';
    request.open('GET', url, true);
    request.onload = function () {

        // access JSON data
        //var data = JSON.parse(request.responseText)

        console.log(request.responseText);

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

    getNewSearchResult();

    loadPage();
    showDate();
    loadWiki();

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
