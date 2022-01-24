const passport = require('passport');
const config = require('./config/config.json');

const GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = "408203225513-acb3grp7qbnb95i2qv5efe084oeonhgb.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${config.base_url}/google/callback`,//"http://localhost:8080/google/callback",
    passReqToCallback: true
},
    function (request, accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user)
});

passport.deserializeUser(function (user, done) {
    done(null, user)
});
