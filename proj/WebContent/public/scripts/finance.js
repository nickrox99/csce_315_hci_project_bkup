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
    
    var symbol = 'AMZN'; //test with BTC for currency

    var apiKey = '0SE9COWFX0MGZGAE';
    var functionStockDaily = 'GLOBAL_QUOTE';
    var interval = '1min';
    var urlStocks = 'https://www.alphavantage.co/query?function=' + functionStockDaily + '&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey; 


    var open = '';
    var high = '';
    var low = '';
    var price = '';
    var latestTradingDay = '';
    var previousClose = '';
    var change = '';
    var changePercent = '';

    var yearHigh = '';
    var yearLow = '';

    jQuery.ajax({
        url: urlStocks,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
            console.log(data);

          
            latestTradingDay = data['Global Quote']['07. latest trading day'];
            console.log(latestTradingDay);
            open = data['Global Quote']['02. open'];
            console.log("Open: " + open);
            high = data['Global Quote']['03. high'];
            console.log("High: " + high);
            low = data['Global Quote']['04. low'];
            console.log("Low: " + low);
            price = data['Global Quote']['05. price'];
            console.log("Close: " + price);
            change = data['Global Quote']['09. change'];
            console.log("Change: " + change);
            changePercent = data['Global Quote']['10. change percent'];
            console.log("Change Percent: " + changePercent);
          
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
function symbolSearch() {

    var apiKey = '0SE9COWFX0MGZGAE';
    var keyword = 'microsoft';
    var urlSearch = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + keyword  + '&apikey=' + apiKey;
    
    jQuery.ajax({
        url: urlSearch,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
            console.log(data);
        }
    });
    
}

window.onload = (function () {
   
    // load the finance info
    loadFinanceInfo();

    // get the search results from local storage
    //getNewSearchResult();

    // symbol search
    //symbolSearch()



    console.log("result: " + result);
    console.log("previousResult: " + previousResult);
    
});