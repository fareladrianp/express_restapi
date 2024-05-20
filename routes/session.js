var express = require("express");
const session = require("express-session");
const router = express.Router();

router.get("/", (req, res) => {
  req.session.counter = req.session.counter ? req.session.counter + 1 : 1;
  res.send(
    `Kamu telah mengunjungi halaman ini sebanyak ${req.session.counter} kali`
  );
});

var sessionData;
router.get("/set_session", (req, res) => {
  sessionData = req.session;
  sessionData.user = {};
  let username = "Farelap";
  sessionData.user.username = username;
  sessionData.user.id = Math.random();
  console.log(
    "Setting session data :username=%s and id=%s",
    username,
    sessionData.user.id
  );
  res.json(sessionData.user);
});

router.get("/get_session", (req, res) => {
  sessionData = req.session;
  let userObj = {};
  if (sessionData.user) {
    userObj = sessionData.user;
  }
  console.log("Get data pada :username", userObj);
  res.json(userObj);
});

router.get("/destroy_session", (req, res) => {
  sessionData = req.session;
  sessionData.destroy((err) => {
    if (err) {
      msg = "Ada kesalahan dalam destroy session";
      res.json(msg);
    } else {
      msg = "Session destroy berhasil";
      console.log(msg);
      res.json(msg);
    }
  });
});

module.exports = router;
