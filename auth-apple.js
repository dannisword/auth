const fs = require('fs');
const passport = require('passport');
const config = require('./config/config.json');
const AppleStrategy = require('passport-apple').Strategy;


passport.use(new AppleStrategy({
    clientID: config.client_id,//"XC.com.museum.web",
    teamID: "32VZ7FNC96",
    //callbackURL: "https://example-app.com/redirect",
    callbackURL: "https://example-app.com/redirect",
    keyID: "LRTM4KG66Q",
    privateKeyLocation: './config/AuthKey_LRTM4KG66Q.p8',
    passReqToCallback: true
}, function(req, accessToken, refreshToken, idToken, profile, cb) {
    cb(null, profile);
}));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});