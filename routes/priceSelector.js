const express = require("express");
const router = express.Router();
const { searchSelector } = require("../db/database");

module.exports = () => {
  router.get("/price/selector", async (req, res) => {
    if (!req.cookies.username) {
      res.cookie("userRole", false);
      res.cookie("username", "Guest");
    }
    // console.log('min', req.query.minprice);
    // console.log('max', req.query.maxprice);
    const result = await searchSelector(req.query.minprice, req.query.maxprice);
    console.log(result);
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      search: result,
    };
    res.render("search_page", templateVars);
  });

  router.get("/price/selector/red", async (req, res) => {
    if (!req.cookies.username) {
      res.cookie("userRole", false);
      res.cookie("username", "Guest");
    }
    const result = await searchSelector(req.query.minprice, req.query.maxprice, 'Red');
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      search: result,
    };
    res.render("search_page", templateVars);
  });
  router.get("/price/selector/white", async (req, res) => {
    if (!req.cookies.username) {
      res.cookie("userRole", false);
      res.cookie("username", "Guest");
    }
    const result = await searchSelector(req.query.minprice, req.query.maxprice, 'White');
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      search: result,
    };
    res.render("search_page", templateVars);
  });

  return router;
};
