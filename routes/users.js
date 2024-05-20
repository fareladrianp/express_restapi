var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
  console.log(req.method);
  res.send("Hallo Gamelab");
});

router.get("/header", function (req, res) {
  var userAgent = req.headers["user-agent"];
  console.log(userAgent);
  res.send(userAgent);
});

router.post("/users/:id", function (req, res) {
  var id = req.params.id;
  var path = req.path;
  console.log(id, path);
  res.json({ id, path });
});

const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.post("/", (req, res) => {
  console.log(req.body);
  res.send("Data sudah diterima");
});

router.get("/kueri", (req, res) => {
  try {
    var nama = req.query.nama;
    var usia = req.query.usia;
    console.log(nama, usia);
    res.json({ nama, usia });
  } catch (err) {
    res
      .status(500)
      .json({ error: "INTERNAL_SERVER_ERROR", message: err.message });
  }
});

const users = {
  gamelab: {
    username: "gamelab",
    password: "indonesia",
  },
};

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ message: "Tidak ada akses" });
  }

  const [type, credentials] = authHeader.split(" ");
  if (type !== "Basic") {
    return res.status(401).json({ message: "Tidak ada akses" });
  }

  const [username, password] = Buffer.from(credentials, "base64")
    .toString()
    .split(":");
  const user = users[username];
  if (!user || user.password !== password) {
    return res.status(401).json({ message: "Tidak ada akses" });
  }

  req.auth = { username };
  next();
};

router.use(authenticate);

router.get("/profile", (req, res) => {
  res.json({
    message: "Selamat Datang di Gamelab Indonesia",
    user: req.auth,
  });
});

module.exports = router;
