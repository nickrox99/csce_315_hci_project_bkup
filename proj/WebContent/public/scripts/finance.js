function loadFinanceInfo(){
    
    console.log("loadFinacneInfo() started in About-us.js");
    
    var apiKey = '0SE9COWFX0MGZGAE';
    var funtion = 'TIME_SERIES_INTRADAY';
    var interval = '1min';
    var symbol = 'AMZN';
    var url = 'https://www.alphavantage.co/query?function=' + funtion + '&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey; 
    
    jQuery.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
          console.log(data);
        }
    });
    
}

window.onload = (function () {
   
    loadFinanceInfo();
    
});