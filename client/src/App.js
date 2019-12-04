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
<<<<<<< HEAD
    console.log(this.state.items);
    console.log(this.state.items[0]);
	const s = String(this.state.items);
	var str = s.substr(4)
	
	var result = str.replace(/\[/g,'').replace(/\]/,'').replace(/\\/g,'');
	var resultArr = result.split('"');
	
	for( var i = 0; i < resultArr.length; i++){ 
		if ( resultArr[i] === ",") {
			resultArr.splice(i, 1); 
		}
	}
	console.log(resultArr);
	
	var max = 0;
	for (var i = 0; i < resultArr.length; i++){
		var l = String(resultArr[i]).length;
		if (l > max){
			max = l;
			result = String(resultArr[i]);
		}
	}
    return result
=======
    return "Trending"
>>>>>>> 61136ea5e3f03e17a60a39f6dcebb6b91d3711f9
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
    console.log(data)
    var correctedData = data.replace(/{/g,'').replace(/}/g,'').replace(/"Global Quote":/g,'').replace(/"01. symbol":/g,'').replace(/"02. open":/g,'').replace(/"03. high":/g,'')
    .replace(/"04. low":/g,'').replace(/"05. price":/g,'').replace(/"06. volume":/g,'').replace(/"07. latest trading day":/g,'').replace(/"08. previous close":/g,'')
    .replace(/"09. change":/g,'').replace(/"10. change percent":/g,'').replace(/"/g,'')
    var correctedDataArray = correctedData.split(",")

    const element = 
      React.createElement('p',{},"Ticker: " + String(correctedDataArray[0]),
      React.createElement('p',{},"Open: " + String(correctedDataArray[1]),
      React.createElement('p',{},"High: " + String(correctedDataArray[2]),
      React.createElement('p',{},"Low: " + String(correctedDataArray[3]),
      React.createElement('p',{},"Price: " + String(correctedDataArray[4]),
      React.createElement('p',{},"Volume: " + String(correctedDataArray[5]),
      React.createElement('p',{},"Disclamer: " + String(correctedDataArray[6]),
      React.createElement('p',{},"Previous Close: " + String(correctedDataArray[7]),
      React.createElement('p',{},"Change: " + String(correctedDataArray[8]),
      React.createElement('p',{},"Change Percent: " + String(correctedDataArray[9])
    ))))))))))
    return element
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
    const element = 
      React.createElement('p',{},String(this.state.items[0]),
      React.createElement('p',{},String(this.state.items[1]),
      React.createElement('p',{},String(this.state.items[2]),
      React.createElement('p',{},String(this.state.items[3]),
      React.createElement('p',{},String(this.state.items[4])
    )))))
    return element
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
  render(){
    const { error, isLoaded, items } = this.state;
    return String(this.state.items)
  }
}