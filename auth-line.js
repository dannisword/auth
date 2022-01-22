const passport = require('passport');
const LineStrategy = require('passport-line').Strategy;

const LINE_CLIENT_ID = "1656714179";
const LINE_CLIENT_SECRET = "fa8b5d1bfae92d5edebc09c3e612d16a";


passport.use(new LineStrategy({
    channelID: LINE_CLIENT_ID,
    channelSecret: LINE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/line/callback"
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
