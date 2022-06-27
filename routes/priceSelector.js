const express = require('express');
const router  = express.Router();
const { Pool } = require("pg");
const dbParams = require("../lib/db");
const db = new Pool(dbParams);
db.connect();

module.exports = (db) => {
  router.get('/price/selector', async (req, res) => {
    const { Pool } = require("pg");
    const dbParams = require("../lib/db");
    const db = new Pool(dbParams);
    db.connect();
    const searchSelector = async() => {
      const result = await db.query(`SELECT * FROM wine_listings WHERE price > ${req.query.minprice} AND price < ${req.query.maxprice};`);
      return result.rows
    }
    const result = await searchSelector();
    const templateVars = {
      search: result
    };
    res.render('search_page', templateVars);
  });
  router.get('/price/selector/red', async (req, res) => {
    const { Pool } = require("pg");
    const dbParams = require("../lib/db");
    const db = new Pool(dbParams);
    db.connect();
    const redSearch = async() => {
      const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='Red' AND (price BETWEEN ${req.query.minprice} AND ${req.query.maxprice});`);
      return result.rows;
    };
    const result = await redSearch();
    const templateVars = {
      search: result
    }
    res.render('search_page', templateVars);
  });
  router.get('/price/selector/white', async (req, res) => {
    const { Pool } = require("pg");
    const dbParams = require("../lib/db");
    const db = new Pool(dbParams);
    db.connect();
    const whiteSearch = async() => {
      const result = await db.query(`SELECT * FROM wine_listings WHERE wine_type='White' AND (price BETWEEN ${req.query.minprice} AND ${req.query.maxprice});`);
      return result.rows;
    };
    const result = await whiteSearch();
    const templateVars = {
      search: result
    }
    res.render('search_page', templateVars);
  });
  return router;
};
