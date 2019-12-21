
function showDate() {
    var d = new Date();
    var n = d.toDateString();
    document.getElementById("date").innerHTML = n;

}

window.onload = (function () {
    
    // show date works
    showDate();

    const wikiInfoLocation = document.querySelector('#wiki_summary');
    ReactDOM.render(e(wikiInfo),wikiInfoLocation); 

    const twitterInfoLocation = document.querySelector('#tweets');
    ReactDOM.render(e(twitterInfo),twitterInfoLocation);

    const sentimentInfoLocation = document.querySelector('#sentiment');
    ReactDOM.render(e(sentimentInfo),sentimentInfoLocation);

    const financeGraphInfoLocation = document.querySelector('#financeGraph');
    ReactDOM.render(e(financeGraphInfo),financeGraphInfoLocation);

    const financeInfoLocation = document.querySelector('#finance_summary');
    ReactDOM.render(e(financeInfo),financeInfoLocation);

    //ReactDOM.render(company_name,document.querySelector('#Company Name'));


});
