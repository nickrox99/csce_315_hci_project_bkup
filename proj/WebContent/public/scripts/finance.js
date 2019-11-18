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
    var symbol = 'GOOG'; 
    var apiKey = '0SE9COWFX0MGZGAE';
    var functionStockGeneral = 'GLOBAL_QUOTE';
    var interval = '1min';
    var urlStocks = 'https://www.alphavantage.co/query?function=' + functionStockGeneral + '&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey;

    jQuery.ajax({
        url: urlStocks,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
          
            var latestTradingDay = data['Global Quote']['07. latest trading day'];
            document.getElementById("disclamer").innerHTML = 'Disclamer: '+ latestTradingDay;

            var open = data['Global Quote']['02. open'];
            document.getElementById("open").innerHTML = 'Open: $'+ open;

            var high = data['Global Quote']['03. high'];
            document.getElementById("high").innerHTML = 'High: $'+ high;

            var low = data['Global Quote']['04. low'];
            document.getElementById("low").innerHTML = 'Low: $'+ high;

            var price = data['Global Quote']['05. price'];
            document.getElementById("price").innerHTML = '$'+ price;

            var previousClose = data['Global Quote']['08. previous close'];
            document.getElementById("prev").innerHTML = 'Prev Close: $'+ price;
            
            var change = data['Global Quote']['09. change'];
            document.getElementById("change").innerHTML = 'Change: $'+ change;
            
            var changePercent = data['Global Quote']['10. change percent'];
            document.getElementById("changePercent").innerHTML = 'Change Percent: '+ changePercent;
            
        }

    });

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

//add listener function
function autoComplete() {

    var apiKey = '0SE9COWFX0MGZGAE';
    var keyword = document.getElementById("myInput").value;
    var urlSearch = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword  + '&apikey=' + apiKey;
    
    // jQuery.ajax({
    //     url: urlSearch,
    //     dataType: 'json',
    //     contentType: "application/json",
    //     success: function(data){
    //         console.log(data);

    //     }
    // });

    
}

window.onload = (function () {
   
    // load the finance info
    loadFinanceInfo();

    // get the search results from local storage
    getNewSearchResult();

    // symbol search
    document.getElementById("myInput").addEventListener("input", autoComplete, false);



    console.log("result: " + result);
    console.log("previousResult: " + previousResult);
    
});