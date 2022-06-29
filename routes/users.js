/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { append } = require('express/lib/response');
const router  = express.Router();


// const { getAllWines } = require('../db/database');
const database = require('../db/database');



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
    console.log(form);
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
            res.cookie('userID', user.id)
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
    const form = req.body;
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }

    if (req.cookies.username === "Guest") {
      res.redirect('/login');
    }

    /*
    req.cookie.username to grab the name of the user, and sequentially the emails can be grabbed with:
        getUserEmailByID,
        getSellerEmailByID


    */

    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole
    };
    res.render('contact', templateVars);
  });

  router.get("/admin-listing", function(req, res) {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,};
    res.render('admin_listing', templateVars);
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
  });

  // favorites page favorite button:
  router.get("/favourites_status", function(req, res) {
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
    res.render('createListing', templateVars);
  });

  router.get("/admin/dashboard", async (req, res) => {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await database.getWineriesListings(req.cookies.userID);
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      id: req.cookies.userID,
      wineryListings: result
      };
     //console.log(result);
    res.render('admin_page', templateVars);
  });

  router.post('/soldout', async (req, res) => {
    //console.log(req.body);
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
  })

  return router;
};
