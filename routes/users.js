/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const app = express();
const { append } = require('express/lib/response');
const router  = express.Router();


// const { getAllWines } = require('../db/database');
const database = require('../db/database');


app.use(express.json());
module.exports = () => {


  router.get("/login", function(req, res) {
    // console.log('userRole', req.cookies.userRole);
    // console.log('username', req.cookies.username);
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,};
    res.render('login', templateVars);
  });



  router.post('/login', (req, res) => {
    const form = req.body;
    // console.log(form);
    database.getUserByEmail(form.email)
      .then((user) => {
        console.log(user);
        if (!user.email) {
          res.redirect('/login');
        } else {
          if (user.password !== form.password) {
            res.redirect('/login');
          } else {
            // req.cookies.username = user.name;
            // req.cookies.userRole = user.sellers;
            res.cookie('username', user.name);
            res.cookie('userRole', user.sellers);
            res.redirect('/wines');
          }
        }
      });
  });

  router.post('/logout', (req, res) => {
    res.cookie('userRole', false);
    res.cookie('username', 'Guest');
    res.redirect('/login');
  });

  router.get("/contact-page", function(req, res) {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    res.render('contact');
  });

  router.get("/favourites", function(req, res) {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,};
    res.render('favorites', templateVars);

  router.get("/admin-listing", function(req, res) {
    res.render('admin_listing');

  });
  router.get('/favourites', function(req, res) {
    res.render('favorites');
  })


  // favorites page favorite button:
  router.get("/favorites_status", function(req, res) {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,};
    res.render('/favorites_status/userid/listing', templateVars);
  });

  router.get("/create-listing", function(req, res) {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,};
    res.render('/createListing', templateVars);
  });

  return router;
};
