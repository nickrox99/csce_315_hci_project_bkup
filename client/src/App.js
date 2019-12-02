import React, { Component } from 'react';
//import Twitter from 'twitter';


// VIEWS
import './App.css';
// import Trending  from ./Trending
// import Finance from ./Finance


// TWITTER



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: null
    };
  }


  componentDidMount() {
      this.callAPI()
      .then(res => this.set({data: twitter_res}))
      .then(err => console.log(err));
    }

    async callAPI() {
      const twitter_res = await fetch('/trending')
      const body = await twitter_res.json();
      this.state.data = body;
    }


  render()
  {
      return(
        <>
        <div> Hello </div>
        </>

    );
}
}

class Twitter_search extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      data: null,
      hits: [],
    };
  }

  componentDidMount()
  {
    fetch()
  }
  render()
  {
    return <h1>Twitter Results</h1>
  }
}
export default App, Twitter_search;
