const express = require("express");
const router = express.Router();
const fs = require('fs');
const { mailSender } = require("./mailSender");


module.exports = () => {
  let fetchEmailFrom = `SELECT email from users WHERE id = 6;`;
  let fetchEmailTo = `SELECT email from users WHERE id = 6;`;

  router.get("/send/:name", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie("userRole", false);
      res.cookie("username", "Guest");
    }

    console.log(req.query.text);

    mailSender(fetchEmailFrom, fetchEmailTo, req.query.text);

  });


  return router;
};
