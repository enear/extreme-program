var router = require('express').Router();
var request = require('request');


router.get('/slack', function(req, res) {

    var params = serialize({
        client_id: process.env.CLIENT_ID,
        scope: process.env.SCOPE,
        redirect_uri: process.env.REDIRECT_URI,
        team: process.env.TEAM_ID
    });

    res.redirect('https://slack.com/oauth/authorize?' + params);
});

router.get('/slack/return', function(req, res) {
    console.log("return");
    var params = serialize({
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        code: req.query.code,
        client_secret: process.env.CLIENT_SECRET
    });

    request('https://slack.com/api/oauth.access?' + params, function(error, response, body) {
        var obj = JSON.parse(body);
        if(obj.team.id !== process.env.TEAM_ID) {
            res.redirect('/#/signin');
        }
        else{
            console.log(obj);
            req.flash('user', obj.user.email);
            res.redirect('/signin');
        }
    });
});

function serialize(params) {
    var str = [];
    for(var p in params)
        if (params.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(params[p]));
        }
    return str.join("&");
}

module.exports = router;
