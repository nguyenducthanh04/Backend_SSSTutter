var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", (req, res) => {
  const user = "Thanh test server json";
  res.json(user);
});

module.exports = router;
