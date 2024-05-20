const config = require("../library/database");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

const getAllkelas = (req, res) => {
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("Select * from kelas", (err, rows) => {
      if (err) {
        res.send("error");
      } else {
        res.json({
          data: rows,
        });
      }
    });
    connection.release();
  });
};

const getIdkelas = (req, res) => {
  let id = req.params.id;
  pool.getConnection(function (err, connection) {
    if (err) throw err;
    connection.query("Select * from kelas where id=" + id, (err, rows) => {
      if (err) {
        res.send("error");
      } else {
        res.json({
          data: rows,
        });
      }
    });
    connection.release();
  });
};

module.exports = { getAllkelas, getIdkelas };
