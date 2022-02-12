
const express = require('express');
const session = require("express-session");
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');
const http = require('http');
const path = require('path');
const jwt = require('jsonwebtoken');

const util = require('./src/util.js');
const config = require('./config/config.json');
var routes = require('./routes/index');

//const { runMain } = require('module'); 
//const AppleAuth = require('apple-auth');


//const routes = require('./routes/index');

require('./auth-google');
require('./auth-line');
require('./auth-apple');
//console.log(config);
//let auth = new AppleAuth(config, fs.readFileSync('./config/AuthKey_LRTM4KG66Q.p8').toString(), 'text');

var ip = getIPAdress();
console.log('Server running at http:' + ip + ':3000/');

function isLogin(req, res, next) {
    console.log(req);
    req.user ? next() : res.sendStatus(401);
};

const app = express();
app.use(session({ secret: "cats" }));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);

function run() {
    //util.addOAuth();

}

run();

app.get('/', (req, res) => {
    res.send(`<a href="/auth/google"><h1>Google</h1> </a>
              <br/>
              <a href="/auth/line" font-size:large;><h1>Line</h1><a>
              <br/>`);
});
//#region google auth
app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
);
//#endregion


//#region line
app.get('/auth/line', passport.authenticate('line'));

app.get('/auth/line/callback',
    passport.authenticate('line', {
        failureRedirect: '/auth/failure',
        successRedirect: '/protected'
    })
);
//#endregion

//#region apple
app.get("/auth/apple", passport.authenticate('apple', {
    successRedirect: '/protected',
    failureRedirect: '/auth/failure'
}));

app.post("/auth/apple/callback", function (req, res, next) {
    passport.authenticate('apple', function (err, user, info) {
        if (err) {
            if (err == "AuthorizationError") {
                res.send("Oops! Looks like you didn't allow the app to proceed. Please sign in again! <br /> \
                 <a href=\"/login\">Sign in with Apple</a>");
            } else if (err == "TokenError") {
                res.send("Oops! Couldn't get a valid token from Apple's servers! <br /> \
                 <a href=\"/login\">Sign in with Apple</a>");
            }
        } else {
            res.json(user);
        }
    })(req, res, next);
});
//#endregion

app.get('/auth/failure', (req, res) => {
    res.send('驗證錯誤');
});

app.get('/protected', isLogin, (req, res) => {
    util.addOAuth(req, res);
    //res.send(`Hellow ${req.user.displayName}`);
});

app.get('/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

http.createServer(app).listen(3000);


function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}