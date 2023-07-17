const https = require("https");
const fs = require("fs");

module.exports = function getPlaylistHTML(destinationPath, fileUrl) {
  const file = fs.createWriteStream(destinationPath);
  return new Promise((resolve, reject) => {
    https
      .get(fileUrl, (response) => {
        response.pipe(file);

        file.on("finish", () => {
          file.close(() => {
            console.log("File downloaded successfully!");
            resolve();
          });
        });
      })
      .on("error", (err) => {
        console.error("Error downloading file:", err);
        reject();
      });
  });
};
