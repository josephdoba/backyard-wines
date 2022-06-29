const express = require("express");
const router = express.Router();
const { mailSender } = require("./mailSender");


module.exports = () => {
  // When send button is clicked
  router.get("/send", async(req, res) => {
    if (!req.cookies.username) {
      res.cookie("userRole", false);
      res.cookie("username", "Guest");
    }
    const templateVars = {
      user: req.cookies.username,
      userRole: req.cookies.userRole,
      message: req.query.text
    };

    mailSender(req.query.text, templateVars);
    res.render("contact-sent", templateVars);
    // res.redirect("/contact-sent");
  });

  // // redirect to "sent" page
  // router.get("/send/sent", async(req, res) => {
  //   if (!req.cookies.username) {
  //     res.cookie("userRole", false);
  //     res.cookie("username", "Guest");
  //   }
  //   const templateVars = {
  //     user: req.cookies.username,
  //     userRole: req.cookies.userRole,
  //     message: req.query.text
  //   };

  //   res.render("contact-sent", templateVars);
  //   // res.redirect("/contact-sent");

  // });
  return router;
};


