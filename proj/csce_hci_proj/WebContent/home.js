function getUserSearch()
  {
      // get the user search from the homepage and put it in the globle variable
      var searchInput = document.getElementById('search_field').nodeValue;
      result = searchInput;

  }

var subButton = document.getElementById('subButton');
subButton.addEventListener('click', getUserName, false);