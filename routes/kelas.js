var express = require("express");
const config = require("../library/database");
var kelasController = require("../controller/kelasController.js");

let mysql = require("mysql");
let pool = mysql.createPool(config);

pool.on("error", (err) => {
  console.error(err);
});

const router = express.Router();

router.get("/", kelasController.getAllkelas);

router.get("/:id", kelasController.getIdkelas);

router.post("/", (req, res) => {
  let nama_jurusan = req.body.nama_jurusan;
  let deskripsi = req.body.deskripsi;
  let error = false;

  if (!nama_jurusan) {
    error = true;
    res.json({ pesan: "nama_jurusan harus di isi !" });
  }
  if (!deskripsi) {
    error = true;
    res.json({ pesan: "deskripsi harus di isi !" });
  }

  if (!error) {
    let formData = {
      nama_jurusan: nama_jurusan,
      deskripsi: deskripsi,
    };
    pool.getConnection(function (err, connection) {
      if (err) throw err;
      connection.query("Insert into kelas set ?", formData, (err, result) => {
        if (err) {
          res.json({
            pesan: "Data gagal disimpan",
          });
        } else {
          res.send("Data berhasil disimpan");
        }
      });
      connection.release();
    });
  }
});

router.put("/:id", (req, res) => {
  let id = req.params.id;
  let nama_jurusan = req.body.nama_jurusan;
  let deskripsi = req.body.deskripsi;
  let error = false;

  if (!nama_jurusan) {
    error = true;
    res.json({ pesan: "nama_jurusan harus di isi !" });
  }
  if (!deskripsi) {
    error = true;
    res.json({ pesan: "deskripsi harus di isi !" });
  }

  if (!error) {
    let formData = {
      nama_jurusan: nama_jurusan,
      deskripsi: deskripsi,
    };

    connection.query(
      "update kelas set ? where id=" + id,
      formData,
      (err, result) => {
        if (err) {
          res.json({
            pesan: "Data gagal diupdate",
          });
        } else {
          res.send("Data berhasil diupdate");
        }
      }
    );
  }
});

router.delete("/:id", (req, res) => {
  pool.getConnection(function (err, connection) {
    let id = req.params.id;
    connection.query("delete from kelas where id=" + id, (err, result) => {
      if (err) {
        res.json({
          pesan: "Data gagal dihapus",
        });
      } else {
        res.send("Data berhasil dihapus");
      }
    });
  });
});

module.exports = router;
