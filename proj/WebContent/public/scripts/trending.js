var result = "";
var previousResult = "";

/* // user defined Tweet class
class Tweet {
    // constructor
    constructor(TWEET_ID) {
        this.TWEET_ID = TWEET_ID;
        this.next = null
    }
 */
/* 
function fetchTweets(q) {

    // Test the URL in YQL console to make sure it works
    var url = "https://api.twitter.com/1.1/trends/place.json?id=1;"

    // Make synchronous AJAX request to yql
    var tweets = jQuery.ajax({ type: "GET", url: url, dataType: 'json', async: false }).responseText;

    // Parse the JSON response
    var data = JSON.parse(tweets);

    // Return the HTML search results
    return data.query.results.json.items_html;

} */

/* class Tweet_List {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    add(twt) {
        // creates a new node 
        var node = new Node(twt);

        // to store current node 
        var current;

        // if list is Empty add the 
        // element and make it head 
        if (this.head == null) {
            this.head = node;
        }
        else {
            current = this.head;

            // iterate to the end of the 
            // list 
            while (current.next) {
                current = current.next;
            }

            // add node 
            current.next = node;
        }
        this.size++;
    }
    // insert element at the position index 
    // of the list 
    insertAt(twt, index) {
        if (index > 0 && index > this.size)
            return false;
        else {
            // creates a new node 
            var node = new Node(twt);
            var curr, prev;

            curr = this.head;

            // add the element to the 
            // first index 
            if (index == 0) {
                node.next = head;
                this.head = node;
            } else {
                curr = this.head;
                var it = 0;

                // iterate over the list to find 
                // the position to insert 
                while (it < index) {
                    it++;
                    prev = curr;
                    curr = curr.next;
                }

                // adding an element 
                node.next = curr;
                prev.next = node;
            }
            this.size++;
        }
    }

    removeElement(twt) {
        var current = this.head;
        var prev = null;

        // iterate over the list 
        while (current != null) {
            // comparing element with current 
            // element if found then remove the 
            // and return true 
            if (current.element == twt) {
                if (prev == null) {
                    this.head = current.next;
                } else {
                    prev.next = current.next;
                }
                this.size--;
                return current.element;
            }
            prev = current;
            current = current.next;
        }
        return -1;
    }

    isEmpty() {
        return this.size == 0;
    }

    // prints the list items to the console
    printListToConsole() {
        var curr = this.head;
        var str = "";
        while (curr) {
            str += curr.element + " ";
            curr = curr.next;
        }
        console.log(str);
    }
}
 */



function getNewSearchResult() {
    previousResult = result;
    result = localStorage.getItem('submit_result', result);
}

function loadPage() {
    if (result != null) {
        // load based off the user search
    }
    var sourceT = "profile";
    var screenN = "jack";
    // load a default shell
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

function loadWiki() {
    // load Wikipedia data
    var query = result;
    var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search="+ ${query} + "&format=json';
    request(url, function (err, response, body) {
        if (err) {
            var error = "cannot connect to the server";
            console.log(error);
        } else {
            console.log("body: ", body);
        }
    });

    var wiki = JSON.parse(body);

    for (var i = 0; i < wiki[1].length; i++) {
       // var data = `You searched for ${wiki[1][i]}: And these are the details — ${wiki[2][i]} Follow this link to read more — ${wiki[3][i]}'  + “\n”;
      //    console.log(data);    
    }

}

function showDate() {
    var d = new Date();
    var n = d.toDateString();
    document.getElementById("date").innerHTML = n;

}

window.onload = (function () {
    `   `
    var tweet = document.getElementById("tweet");
    var tweet_id = tweet.getAttribute("tweetID");

    getNewSearchResult();

    loadPage();
    showDate();
    loadWiki();

    console.log("result: " + result);
    console.log("previousResult: " + previousResult);
});
