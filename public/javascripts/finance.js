//var result = localStorage.getItem('search_result', result);
var result = "";
var previousResult = "";


function getNewSearchResult() {

    console.log("getNewSearchResult() started in finance.js")

    // get the latest search results
    previousResult = result;
    result = localStorage.getItem('search_result', result);
}

function loadFinanceInfo(){
    
    console.log("loadFinanceInfo() started in finance.js");
    
    // URL Request
    var userInput = document.getElementById("myInput").value;
    //split the text into symbol and company name
    var userInputSplit = userInput.split(" | ");

    var symbol = userInputSplit[0];
    var apiKey = '0SE9COWFX0MGZGAE';
    var functionStockGeneral = 'GLOBAL_QUOTE';
    var interval = '1min';
    var urlStocks = 'https://www.alphavantage.co/query?function=' + functionStockGeneral + '&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey;

    var request = new XMLHttpRequest();

    // request general finance information from API based on user symbol
    // jQuery.ajax({
    //     url: urlStocks,
    //     dataType: 'json',
    //     contentType: "application/json",
    //     success: function(data){
    //         //console.log(data);

    //         var latestTradingDay = data['Global Quote']['07. latest trading day'];
    //         var latestTradingDaySplit = latestTradingDay.split("-");
    //         var year = latestTradingDaySplit[0];
    //         var month = latestTradingDaySplit[1];
    //         var day = latestTradingDaySplit[2];
    //         document.getElementById("disclamer").innerHTML = 'Disclamer: '+ month + '-' + day + '-' + year;

    //         var open = data['Global Quote']['02. open'];
    //         document.getElementById("open").innerHTML = 'Open: $'+ open;

    //         var high = data['Global Quote']['03. high'];
    //         document.getElementById("high").innerHTML = 'High: $'+ high;

    //         var low = data['Global Quote']['04. low'];
    //         document.getElementById("low").innerHTML = 'Low: $'+ high;

    //         var price = data['Global Quote']['05. price'];
    //         document.getElementById("price").innerHTML = '$'+ price;

    //         var previousClose = data['Global Quote']['08. previous close'];
    //         document.getElementById("prev").innerHTML = 'Prev Close: $'+ price;
            
    //         var change = data['Global Quote']['09. change'];
    //         document.getElementById("change").innerHTML = 'Change: $'+ change;
            
    //         var changePercent = data['Global Quote']['10. change percent'];
    //         document.getElementById("changePercent").innerHTML = 'Change Percent: '+ changePercent;
            
    //     }

    // });

    //Code for 

    // var functionCrypto = 'DIGITAL_CURRENCY_WEEKLY';
    // var market = 'USD';
    // var urlCrypto = 'https://www.alphavantage.co/query?function=' + functionCrypto + '&symbol=' + symbol + '&market=' + market + '&apikey=' + apiKey; 

    // jQuery.ajax({
    //     url: urlCrypto,
    //     dataType: 'json',
    //     contentType: "application/json",
    //     success: function(data){
    //         console.log(data);
            
    //         name = data['Meta Data']['3. Digital Currency Name'];
    //         date = data['Meta Data']['6. Last Refreshed'];
    //         date = date.substr(0,10);
    //         open = data['Time Series (Digital Currency Weekly)'][date]['1a. open (USD)'];
    //         high = data['Time Series (Digital Currency Weekly)'][date]['2b. high (USD)'];
    //         low = data['Time Series (Digital Currency Weekly)'][date]['3a. low (USD)'];
    //         close = data['Time Series (Digital Currency Weekly)'][date]['4a. close (USD)'];

    //         console.log('Currency Name: ' + name);
    //         console.log('Currency Symbol: ' + symbol);
    //         console.log('Date: ' + date);
    //         console.log('Open: $' + open);
    //         console.log('High: $' + high);
    //         console.log('Low: $' + low);
    //         console.log('Close: $' + close);
    //     }
    // });
    
}


function getListForAutocomple() {
    var apiKey = '0SE9COWFX0MGZGAE';
    var keyword = document.getElementById("myInput").value;
    var urlSearch = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword  + '&apikey=' + apiKey;
    
    // Sends the a string of a Company or Ticker Symbol to API and returns the 4 most popular results
    jQuery.ajax({
        url: urlSearch,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
            console.log(data);
            var list = [
                data['bestMatches']['0']['1. symbol'] + " | " + data['bestMatches']['0']['2. name'],
                data['bestMatches']['1']['1. symbol'] + " | " + data['bestMatches']['1']['2. name'],
                data['bestMatches']['2']['1. symbol'] + " | " + data['bestMatches']['2']['2. name'],
                data['bestMatches']['3']['1. symbol'] + " | " + data['bestMatches']['3']['2. name']
            ];
            //Sends input return from API and adding it to the webpage
            autocomplete(document.getElementById("myInput"), list);
    
        }
    });
}

function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("keypress", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            b.innerHTML =  arr[i] + "</strong>";
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
      closeAllLists(e.target);
  });
}

function createStockChart(){
}

function setCompanyNameAndTickerSymbol(){
    // get text from textbox
    var userInput = document.getElementById("myInput").value;
    // split the text into symbol and company name
    var userInputSplit = userInput.split(" | ");
    var tickerSymbol = userInputSplit[0];
    var companyName = userInputSplit[1];

    //display on the webpage
    document.getElementById("name").innerHTML = companyName + ' (' + tickerSymbol + ")"
}

function displayChartAndFinanceInfo(){
    loadFinanceInfo();
    //createStockChart();
    setCompanyNameAndTickerSymbol();
}

window.onload = (function () {

    // get the search results from local storage
    //getNewSearchResult();

    // get Top 4 symbols for each keystroke and display on search bar
    // This funtion activly changes when the user types
    document.getElementById("myInput").addEventListener("input", getListForAutocomple);

    console.log("result: " + result);
    console.log("previousResult: " + previousResult);
    
});