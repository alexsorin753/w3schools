var express = require('express');
var router = express.Router();

// GET home page.
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home' });
});

// GET button page.
router.get('/buttons', function(req, res, next) {
  res.render('buttons', { title: 'Buttons' });
});

// GET images page.
router.get('/images', function(req, res, next) {
  res.render('images', { title: 'Images' });
});

// GET menu page.
router.get('/menu', function(req, res, next) {
  res.render('menu', { title: 'Menu' });
});

// GET forms page.
router.get('/forms', function(req, res, next) {
  res.render('forms', { title: 'Forms' });
});

// GET filters page.
router.get('/filters', function(req, res, next) {
  res.render('filters', { title: 'Filters' });
});

// GET tables page.
router.get('/tables', function(req, res, next) {
  res.render('tables', { title: 'Tables' });
});

// GET more page.
router.get('/more', function(req, res, next) {
  res.render('more', { title: 'More' });
});

// GET other page.
router.get('/other', function(req, res, next) {
  res.render('other', { title: 'Other' });
});

// External pages

// GET fixed-sidebar-full page.
router.get('/fixed-sidebar-full', function(req, res, next) {
  res.render('external/fixed_sidebar_full', { title: 'Full Fixed Sidebar'});
});

// GET fixed-sidebar-auto page.
router.get('/fixed-sidebar-auto', function(req, res, next) {
  res.render('external/fixed_sidebar_auto', { title: 'Auto Fixed Sidebar'});
});

// GET side-navigation page.
router.get('/side-navigation', function(req, res, next) {
  res.render('external/side_navigation', { title: 'Side Navigation'});
});

// GET responsive_sidebar.
router.get('/responsive-sidebar', function(req, res, next) {
  res.render('external/responsive_sidebar', { title: 'Responsive Sidebar'});
});

// GET fullscreen_nav.
router.get('/fullscreen-nav', function(req, res, next) {
  res.render('external/fullscreen_nav', { title: 'Fullscreen Navigation'});
});
module.exports = router;