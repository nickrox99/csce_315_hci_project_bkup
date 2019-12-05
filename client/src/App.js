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
    console.log(this.state.items)
    console.log(this.state.items)
    return "Finance Graphs"
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