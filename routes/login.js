var router = require('express').Router();
var request = require('request');

router.get('/slack', function(req, res) {
    //TODO: make this data procsess.env variables

    var params = serialize({
        client_id: "4173363215.47618547495",
        scope: "identity.basic identity.email ",
        redirect_uri: "http://localhost:3000/auth/slack/return",
        team: "T0453AP6B"
    });


    console.log(params);

    res.redirect('https://slack.com/oauth/authorize?' + params);
});

router.get('/slack/return', function(req, res) {
    var params = serialize({
        client_id: "4173363215.47618547495",
        redirect_uri: "http://localhost:3000/auth/slack/return",
        code: req.query.code,
        client_secret: '3673e6d751c486f23cff36654f13cb1f'
    });

    request('https://slack.com/api/oauth.access?' + params, function(error, response, body) {
        var obj = JSON.parse(body);
        console.log(obj);
        res.redirect('/#/login?user=' + obj.user.email);
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
