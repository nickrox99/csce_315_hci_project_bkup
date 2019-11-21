import React, {Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:3000/trending")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  callTwitter ()
  {
    fetch("http://localhost:3000/finance")
    .then(res => res.text())
    .then(res => this.setState({twitResponse: res}));
  }

  componentWillMount() {
    this.callAPI();
  }

  render()
  {
    return (
      <div> x
      <div class="div-title">
        <p class="p-title">Butterfly Effect</p>
      </div>
      <div class="topnav">
        <a href="../views/home.html">Home</a>
        <a class="active" href="../views/trending.html">Trending</a>
        <a href="../views/news.html">News</a>
        <a href="../views/sports.html">Sports</a>
        <a href="../views/finance.html">Finance</a>
        <a href="../views/about-us.html">About Us</a>
      </div>
      <div class="div-search-bar">
        <form id='search_form'>
          <div class='form-user_search'>
            <label id='searchLable' for='searchField'>Please enter desired search: </label>
            <input size="300" id='search_field' type='text'></input>
          </div>
          <div class='form-sub'>
            <button id='submit_button' type='button'>Submit</button>
          </div>
        </form>

      </div>

      <div class="div-description">
        <p class="p-descrption">Description</p>
      </div>

      </div>

    );
  }
}

export default App;
