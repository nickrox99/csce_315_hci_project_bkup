

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
    console.log(this.state.items);
    console.log(this.state.items[0]);

    return "Trending"
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
    fetch("/search")
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
    //console.log(this.state.items);
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
    console.log(this.state.items);
    console.log(this.state.items[0]);
    console.log(String(this.state.items[0]));
    //var tweet = this.state.items[0];
    return String(this.state.items[0])
  }
}


// class Twitter_search extends Component
// {
//   constructor(props)
//   {
//     super(props);
//     this.state = {
//       data: null,
//       hits: [],
//     };
//   }

//   componentDidMount()
//   {
//   }
//   render()
//   {
//     return 'It worked';
//   }
// }
//export default wikiInfo;