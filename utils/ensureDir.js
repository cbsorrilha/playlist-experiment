const path = require("path");
const fs = require("fs");

module.exports = function ensureDir(dirPath) {
  // Normalize the directory path
  dirPath = path.resolve(dirPath);

  // Check if the directory exists
  if (!fs.existsSync(dirPath)) {
    // Create the directory
    fs.mkdirSync(dirPath, { recursive: true });
    console.log("Directory created:", dirPath);
  } else {
    console.log("Directory already exists:", dirPath);
  }
};
