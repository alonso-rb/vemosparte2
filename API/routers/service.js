var {
    getAllServices,
    getServices,
    createServices,
    deleteServices,
  } = require("../controllers/service");
  var express = require("express");
  var router = express.Router();
  
  router.get("/", getAllServices);
  router.get("/", getServices);
  router.post("/", createServices);
  
  module.exports = router;