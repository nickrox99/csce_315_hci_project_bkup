function getUserSearch() {
    // get the user search from the homepage and put it in the globle variable
    var searchInput = document.getElementById('search_field').value;
    result = searchInput;
    localStorage.setItem('search_result', result);
    console.log(result);

}

// logic for submission button
var submit_button = document.getElementById('submit_button');
if (submit_button) {
    // if the user clicks the submit button, submit search results
    submit_button.addEventListener('click', getUserSearch, true);
}

document.onkeydown = function () {
    // if the user hits the enter key
    if (window.event.keyCode == '13') {
        // submit search results
        getUserSearch();
    }
}