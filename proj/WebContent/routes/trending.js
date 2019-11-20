exports.trending = function(req, res, next)
{
    res.send('../public/trending.html');
    console.log("trending.html loaded");
}