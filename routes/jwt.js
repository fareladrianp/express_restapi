const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  // Ini adalah kode script untuk token header
  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64");
  console.log(`Ini adalah token untuk header : ${encodedHeader}`);

  // Ini adalah kode script untuk token payload
  const payload = { username: "Gamelab Indonesia" };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64"
  );
  console.log(`Ini adalah token untuk payload : ${encodedPayload}`);

  // Ini adalah kode script untuk token signature
  const crypto = require("crypto");
  const jwtSecret = "secretKey";
  const signature = crypto
    .createHmac("sha256", jwtSecret)
    .update(encodedHeader + "." + encodedPayload)
    .digest("base64");

  console.log(`Ini adalah token untuk signature : ${signature}`);

  // Ini adalah kode script untuk token JWT
  const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;
  res.send(`Ini adalah hasil dari token JWT : ${jwt}`);
});

module.exports = router;
