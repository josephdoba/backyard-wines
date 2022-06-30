const express = require('express');
const router  = express.Router();

const { searchSelector, addWineListing } = require('../../db/database');

module.exports = () => {
  router.get("/wines", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await searchSelector();
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      allWines: result
    };
    res.render('all-wines', templateVars);
  });
  router.get("/wines/featured", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await searchSelector(null,null,null,'NWAC21 Platinum');
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      featuredWines: result
    };
    res.render('featured-wines', templateVars);
  });

  router.get("/wines/red", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie('userRole', false);
      res.cookie('username', 'Guest');
    }
    const result = await searchSelector(null, null, 'Red');
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
    const result = await searchSelector(null, null, 'White');
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
