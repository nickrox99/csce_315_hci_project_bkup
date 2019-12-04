

//import Twitter from 'twitter';


// VIEWS
//import './App.css';
// import Trending  from ./Trending
// import Finance from ./Finance

const e = React.createElement;

// Working Example

// class LikeButton extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = { liked: false };
//   }

//   render() {
//     if (this.state.liked) {
//       return 'You liked this.';
//     }

//     return e(
//       'button',
//       { onClick: () => this.setState({ liked: true }) },
//       'Like'
//     );
//   }
// }

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
    console.log(this.state.items);
    return "Works";
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