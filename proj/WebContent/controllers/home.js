exports.home = function(req, res, next)
{
    res.sendFile('../public/home.html');
    console.log("home.html loaded");
}