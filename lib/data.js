const fs = require("fs");
const path = require("path");

const lib = {};

lib.basedir = path.join(__dirname, "../.data/");

lib.create = (dir, file, data, callback) => {
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        const stringData = JSON.stringify(data);
        fs.writeFile(fileDescriptor, stringData, (err1) => {
          if (!err1) {
            fs.close(fileDescriptor, (err2) => {
              if (!err2) {
                callback("the err", false);
              } else {
                callback("Closing Erro");
              }
            });
          } else {
            callback("Writting Error");
          }
        });
      } else {
        callback("File already Exists");
      }
    }
  );
};

lib.read = (dir, file, callback) => {
  fs.readFile(lib.basedir + dir + "/" + file + ".json", (err, data) => {
    callback(err, data);
  });
};

lib.update = (dir, file, data, callback) => {
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err1) => {
        if (!err1) {
          fs.writeFile(fileDescriptor, stringData, (err2) => {
            if (!err2) {
              fs.close(fileDescriptor, (err3) => {
                if (!err3) {
                  //   callback(false);
                } else {
                  callback("error closign the file");
                }
              });
            } else {
              callback("Error re-writing the file.");
            }
          });
        } else {
          callback("Error truncating the file.");
        }
      });
    } else {
      callback("Error Updating The File, The File may not exist.");
    }
  });
};

lib.delete = (dir, file, callback) => {
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else callback("Error deleting");
  });
};

module.exports = lib;
