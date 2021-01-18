/*
 * All routes for companies are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

module.exports = (db) => {
  // home page
  // router.get("/", (req, res) => {
  //   res.render("home");
  // });

  router.get("/meetus", (req, res) => {
    db.query(`SELECT * FROM companies;`)
      .then(result => {
        const templateVars = {
          company : result.rows
        }
        console.log("companies=" + templateVars)
        // res.json({ companies });
        res.render("meetus", templateVars)
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  // router.get("/about", (req, res) => {
  //   console.log("getting about")
  //   res.render("about");
  // });

  // router.get("/directory", (req, res) => {
  //   console.log("getting directory")
  //   res.render("directory");
  // });

  // router.get("/joinus", (req, res) => {
  //   console.log("join us")
  //   res.render("joinus");
  // });

  // about page
  // router.get("/about", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  return router;
};
