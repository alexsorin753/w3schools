var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

/* GET button page. */
router.get('/buttons', function(req, res, next) {
  res.render('buttons', { title: 'Buttons' });
});

/* GET images page. */
router.get('/images', function(req, res, next) {
  res.render('images', { title: 'Images' });
});

/* GET menu page. */
router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menu' });
});

/* GET forms page. */
router.get('/forms', function(req, res, next) {
  res.render('forms', { title: 'Forms' });
});

/* GET filters page. */
router.get('/filters', function(req, res, next) {
  res.render('filters', { title: 'Filters' });
});

/* GET tables page. */
router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Tables' });
});

/* GET more page. */
router.get('/more', function(req, res, next) {
  res.render('more', { title: 'More' });
});

/* GET other page. */
router.get('/other', function(req, res, next) {
  res.render('other', { title: 'Other' });
});
module.exports = router;