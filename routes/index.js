var express = require('express');
var router = express.Router();

/* get home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'portal' });
});


module.exports = router;