const express = require("express");
const router = express.Router();
const joi = require("joi");
const pool = require("../utils/db");

//查询所有菜品
router.get("/foods", (req, res) => {
  let sql = "select * from foods";
  pool.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length) {
      res.send({ code: 200, data: result });
    }
  });
});

//通过模糊查询搜索菜品
router.get("/foods/like", (req, res) => {
  let { name } = req.query;
  let schema = joi.object({
    name: joi.string().required(),
  });
  let { error, value } = schema.validate(req.query);
  if (error) {
    res.send({ error });
    throw error;
  }
  let sql = "select * from foods where name like ?";
  pool.query(sql, [`%${name}%`], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length) {
      res.send({ code: 200, data: result });
    } else {
      res.send({ code: 200, data: result });
    }
  });
});
module.exports = router;
