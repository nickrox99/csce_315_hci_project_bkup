

function getUserSearch()
  {
      // get the user search from the homepage and put it in the globle variable
      var searchInput = document.getElementById('search_field').value;
      result = searchInput;
      console.log(result);

  }

var submit_button = document.getElementById('submit_button');
if(submit_button){
    submit_button.addEventListener('click', getUserSearch, true);
}