exports.index = function(req, res, next)
{
    res.sendFile('../public/home.html');
}