const express = require("express");
const router = express.Router();
const { mailSender } = require("./mailSender");


module.exports = () => {
  // const fetchEmailFrom (sql query from user)
  // const fetchEmailTo (sql query to business email)


  router.get("/send", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie("userRole", false);
      res.cookie("username", "Guest");
    }
    console.log(req.query.text);

    mailSender(fetchEmailFrom, fetchEmailTo, req.query.text);

  });


  return router;
};
