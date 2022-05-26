// Constants
const fs = require("fs");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
// require('dotenv').config();

const app_ip = process.env.APP_IP

// const baseUrl = "http://localhost:8080/files/";
const baseUrl = "http://" + app_ip + ":18080/files/";
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        const app_ip = process.env.APP_IP
        name: file,
        url: baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};
const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};
module.exports = {
  getListFiles,
  download,
};
