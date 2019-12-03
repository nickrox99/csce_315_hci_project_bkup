

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

class GeneralFinanceInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }
  render(){
    return 'General Finance Info';
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
//export default Twitter_search;