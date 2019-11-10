

function getUserSearch()
  {
      // get the user search from the homepage and put it in the globle variable
      var searchInput = document.getElementById('search_field').value;
      result = searchInput;
      localStorage.setItem('search_result', result);
      console.log(result);

  }

var submit_button = document.getElementById('submit_button');
if(submit_button){
    submit_button.addEventListener('click', getUserSearch, true);
}

document.getElementById('search_field').onkeydown = function(e){
    if(e.keyCode == 13){
      getUserSearch();
    }
 };