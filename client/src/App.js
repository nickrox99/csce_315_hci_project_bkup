const e = React.createElement;

class wikiInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("/wikiAPIcall")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }
  render(){
    const { error, isLoaded, items } = this.state;
	var s = String(this.state.items);
	var strArr = s.substr(4).split('\"');
	
	var max = 0;
	var result = "";
	
	for(var i = 0; i < strArr.length; i++){
		if(String(strArr[i]).length > max){
			result = String(strArr[i])
			max = strArr[i].length
		}
	}		
	
    return result.replace(/\"/g,'')
  }
}

class financeInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  
  componentDidMount() {
    fetch("/financeAPIcall")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }
  render(){
    const { error, isLoaded, items } = this.state;
    var data = String(this.state.items)
    //console.log(data)
    var correctedData = data.replace(/{/g,'').replace(/}/g,'').replace(/"Global Quote":/g,'').replace(/"01. symbol":/g,'').replace(/"02. open":/g,'').replace(/"03. high":/g,'')
    .replace(/"04. low":/g,'').replace(/"05. price":/g,'').replace(/"06. volume":/g,'').replace(/"07. latest trading day":/g,'').replace(/"08. previous close":/g,'')
    .replace(/"09. change":/g,'').replace(/"10. change percent":/g,'').replace(/"/g,'')
    var correctedDataArray = correctedData.split(",")

    const ticker = React.createElement('p',{},"Ticker Symbol: " + String(correctedDataArray[0]));
    const open = React.createElement('p',{},"Open: $" + String(correctedDataArray[1]));
    const high = React.createElement('p',{},"High: $" + String(correctedDataArray[2]));
    const low = React.createElement('p',{},"Low: $" + String(correctedDataArray[3]));
    const price = React.createElement('p',{},"Price: $" + String(correctedDataArray[4]));
    const volume = React.createElement('p',{},"Volume: " + String(correctedDataArray[5]));
    const disclamer = React.createElement('p',{},"Disclamer: " + String(correctedDataArray[6]));
    const prev = React.createElement('p',{},"Previous Close: $" + String(correctedDataArray[7]));
    const change = React.createElement('p',{},"Change: $" + String(correctedDataArray[8]));
    const changePercent = React.createElement('p',{},"Change Percent: " + String(correctedDataArray[9]));
    const container = React.createElement('div',{},[ticker,price,disclamer,open,high,low,prev,volume,change,changePercent]);

    return container
  }
}

class financeGraphInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  
  componentDidMount() {
    fetch("/graphFinanceAPIcall")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }
  render(){
    const { error, isLoaded, items } = this.state;
    var data = String(this.state.items)

    console.log(data)
    var symbol = data.replace(/"/g,'').replace(/{/g,'').replace(/}/g,'').replace("Meta Data:",'').replace("1. Information: Daily Prices (open, high, low, close) and Volumes,",'').replace("2. Symbol: ",'').replace(/\s/g, '');
    var symbol = symbol.substring(0,4);
    console.log(symbol)

    var correctedData = data.replace(/"/g,'').replace(/{/g,'').replace(/}/g,'').replace("Meta Data:",'').replace("1. Information: Daily Prices (open, high, low, close) and Volumes,",'')
    .replace("2. Symbol: ",'').replace("3. Last Refreshed: ",'').replace("4. Output Size: Compact,",'').replace("5. Time Zone: US/Eastern",'').replace(/},/g,'')
    .replace("Time Series (Daily):","").replace(/     1. open:/g,"").replace(/     2. high:/g,"").replace(/     3. low:/g,"").replace(/     4. close:/g,"")
    .replace(/     3. low:/g,"").replace(/     5. volume:/g,"").replace(/:/g,',').replace(/    /g,'').replace(/         /g,'').replace(',','').replace('3. Last Refreshed 2019-12-06','').replace(',','')
    .replace(',','').replace(/\s/g, '').substring(14);

    if (symbol != 'DJIA'){
      correctedData = correctedData.substring(8);
      //console.log(correctedData);
    }

    //console.log(correctedData);
    var dataArray = correctedData.split(',');
    //console.log(dataArray)

    var dateArray = [];
    var priceArray = [];
    var dateStartCounter = 0;
    var priceStartCounter = 4;
  
    for (var i = 0; i < 100; i++){
      dateArray.push(dataArray[dateStartCounter])
      priceArray.push(parseFloat(dataArray[priceStartCounter]))

      dateStartCounter+=6
      priceStartCounter+=6
    }
    //console.log(dateArray)
    //console.log(priceArray)

    var ctx = document.getElementById('myChart');
    var myLineChart = new Chart(ctx, {
      type: 'line',
      
      data: {
        labels: dateArray.reverse(),
        datasets: [{
            data: priceArray,
            backgroundColor :['rgba(75, 192, 192, 0.2)'], 
            borderColor: ['rgba(75, 192, 192, 1)']
        }]
      },

      options: {
        legend: {
          display: false
        },
        scales: {
            yAxes: [{
                ticks: {
                  legend: false
                }
            }]
        }
      }
    });

    return ''
  }
}
class twitterInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("/twitterAPIcall")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }
  render(){
    const { error, isLoaded, items } = this.state;

    const tweet1 = React.createElement('p',{},String(this.state.items[0]))
    const tweet2 = React.createElement('p',{},String(this.state.items[1]))
    const tweet3 = React.createElement('p',{},String(this.state.items[2]))
    const tweet4 = React.createElement('p',{},String(this.state.items[3]))
    const tweet5 = React.createElement('p',{},String(this.state.items[4]))

    // const tweet6 = React.createElement('p',{},String(this.state.items[5]))
    // const tweet7 = React.createElement('p',{},String(this.state.items[6]))
    // const tweet8 = React.createElement('p',{},String(this.state.items[7]))
    // const tweet9 = React.createElement('p',{},String(this.state.items[8]))
    // const tweet10 = React.createElement('p',{},String(this.state.items[9]))
    // const container = React.createElement('div',{},[tweet1,tweet2,tweet3,tweet4,tweet5,tweet6,tweet7,tweet8,tweet9,tweet10])

    const container = React.createElement('div',{},[tweet1,tweet2,tweet3,tweet4,tweet5])


    return container
  }
}


class sentimentInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    fetch("/sentimentAPIcall")
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            isLoaded: true,
            items: result
          });
        },
        error => {
          this.setState({
            isLoaded: true,
            error: error
          });
        }
      );
  }
  // TODO add a color coding scale
  render(){

    console.log("Sentiment Score color coding");

    const { error, isLoaded, items } = this.state;
    var element = null;
    var result = parseFloat(this.state.items);
    console.log(result);
    if(result > 5)
    {
     
      console.log("Sentiment Score -> green");
      element = React.createElement('p',{style:{color:"green", fontSize: 144, size: "auto", textAlign: "center"}},String(result));
    }

    else if(result >= 0 && result <= 5)
    {
      console.log("Sentiment Score -> yellow");
      element = React.createElement('p',{style:{color:"yellow", fontSize: 144, size: "auto", textAlign: "center"}},String(result));
    }
    else if(result <= 0 && result > -5)
    {
      console.log("Sentiment Score -> orange");
      element = React.createElement('p',{style:{color:"orange",  fontSize: 144, size: "auto", textAlign: "center"}},String(result));
    }
    else if(result < -5)
    {
      console.log("Sentiment Score -> red");
      element = React.createElement('p',{style:{color:"red",  fontSize: 144, size: "auto", textAlign: "center"}},String(result));
    }
    const value = element;
    return value;
  }
}
