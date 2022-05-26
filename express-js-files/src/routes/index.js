const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");

let routes = (app) => {
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download_n_delete);
  router.get("/upload", controller.upload);
  router.post("/api/file", controller.getFile);
  router.get("/delete", controller.deleteReq);
  app.use(router);
};
module.exports = routes;