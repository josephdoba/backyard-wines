const express = require('express');
const router  = express.Router();

const { getAllWines } = require('../../db/database');
const { getAllRedWines } = require('../../db/database');
const { getAllWhiteWines } = require('../../db/database');

module.exports = (database) => {
  router.get("/wines", async(req, res) => {
    console.log('user', req.cookies.username);
    console.log('userRole', req.cookies.userRole);
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await getAllWines();
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      allWines: result
    };
    res.render('all-wines', templateVars);
  });
  router.get("/wines/red", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await getAllRedWines();
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      allRedWines: result
    };
    res.render('red-wines', templateVars);
  });
  router.get("/wines/white", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await getAllWhiteWines();
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      allWhiteWines: result
    };
    res.render('white-wines', templateVars);
  });
  //Test db connection
  // router.get("/test", async (req, res) => {
  //   const result = await getAllWines();
  //   res.send(result);
  // });
  return router;
};
