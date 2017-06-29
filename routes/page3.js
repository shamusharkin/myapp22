var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!req.body', req.body);
  res.render('index', { title: 'Express', requestBody: req.body });
});

module.exports = router;
