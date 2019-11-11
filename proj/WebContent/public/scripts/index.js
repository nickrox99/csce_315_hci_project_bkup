
window.location = "home.html";

function showDate() {
 n = new Date();
 y = n.getFullYear();
 m = n.getMonth() + 1;
 d = n.getDate();
 document.getElementById("date").innerHTML = d;
}

showDate()