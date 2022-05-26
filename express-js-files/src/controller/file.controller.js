// Constants
const fs = require("fs");
const multer = require('multer');
const baseUrl = "http://" + process.env.APP_IP + ":18080/files/";

var __download, __deleteF;

// downloadReq
const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    __download = 1; // will go to download
    __deleteF = 0;
    res.status(200).send(fileInfos);
  });
};

// deleteReq
const deleteReq = (req, res) => {
  const directoryPath = __basedir + "/uploads/";
  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });
    __deleteF = 1;
    __download = 0;
    res.status(200).send(fileInfos);
  });
};

// download or delete a file.
const download_n_delete = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/uploads/";
  if(__download == 1){
    res.download(directoryPath + fileName, fileName, (err) => {
      console.log("coming download. ");
      if (err) {
        res.status(500).send({
          message: "Could not download the file. " + err,
        });
      }
    });  
    __download = 0;  
    __deleteF = 0;
  }
  if(__deleteF == 1){
    fs.unlink(directoryPath + fileName, (err) => {
      console.log("coming delete. ");
      if (err) {
        res.status(500).send({
          message: "Could not delete the file. " + err,
        });
      }
      else {
        res.status(200).send({
          message: "The file has been deleted. ",
        });
      }
    });
    __deleteF = 0;  
    __download = 0;
  }
};

// request to upload.
const upload = (req, res) => {
  res.sendFile(__dirname + "/index.html");
};

// upload a file.
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    const directoryPath = __basedir + "/uploads/";
    console.log(directoryPath);
    callback(null, directoryPath);
  },
  filename: function (req, file, callback) {
    console.log(file.originalname);
    callback(null, file.originalname);
  }
});
const getFile = (req, res) => {
  var upload = multer({ storage : storage}).single('userFile');
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
};

module.exports = {
  getListFiles,
  download_n_delete,
  upload,
  getFile,
  deleteReq,
};
