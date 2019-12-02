import React, { Component } from 'react';
//import Twitter from 'twitter';


// VIEWS
import './App.css';
// import Trending  from ./Trending
// import Finance from ./Finance


// TWITTER

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
  }
  render()
  {
    return <h1>Twitter Results</h1>
  }
}
export default Twitter_search;