function loadFinanceInfo(){
    
    console.log("loadFinacneInfo() started in About-us.js");
    
    var apiKey = '0SE9COWFX0MGZGAE';
    var funtion = 'TIME_SERIES_DAILY';
    var interval = '1min';
    var symbol = 'AMZN';
    var url = 'https://www.alphavantage.co/query?function=' + funtion + '&symbol=' + symbol + '&interval=' + interval + '&apikey=' + apiKey; 
    

   
    jQuery.ajax({
        url: url,
        dataType: 'json',
        contentType: "application/json",
        success: function(data){
            console.log(data);
         

          
            date = data['Meta Data']['3. Last Refreshed'];
            open = data['Time Series (Daily)'][date]['1. open'];
            high = data['Time Series (Daily)'][date]['2. high'];
            low = data['Time Series (Daily)'][date]['3. low'];
            close = data['Time Series (Daily)'][date]['4. close'];

            console.log('Company Symbol: ' + symbol);
            console.log('Date: ' + date);
            console.log('Open: $' + open);
            console.log('High: $' + high);
            console.log('Low: $' + low);
            console.log('Close: $' + close);
          
         
        }
    });
    
}

window.onload = (function () {
   
    loadFinanceInfo();
    
});