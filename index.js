const path = require("path");
const fs = require("fs");
const getPlaylistHTML = require("./getPlaylistHTML");
const ensureDir = require("./utils/ensureDir");
const parseTimeFromPlaylist = require("./parse");

(async function main(params) {
  // Get the fileUrl from command-line arguments (argv)
  const playlistUrl = params[2];
  if (!playlistUrl) {
    console.error("Please provide the file URL as a command-line argument.");
    process.exit(1);
  }

  if (
    playlistUrl.indexOf("youtube.com") === -1 ||
    playlistUrl.indexOf("list=") === -1 ||
    playlistUrl.indexOf("https://") === -1 ||
    playlistUrl.indexOf("playlist") === -1
  ) {
    console.error("Please provide a valid playlist URL");
    process.exit(1);
  }

  ensureDir(path.join(__dirname, "tmp"));

  const [_, filename] = playlistUrl.split("list=");

  const destinationPath = path.join(__dirname, "tmp", `${filename}.html`);

  if (!fs.existsSync(destinationPath)) {
    await getPlaylistHTML(destinationPath, playlistUrl);
  }

  if (!fs.existsSync(destinationPath)) {
    console.error("File not found");
    process.exit(1);
  }

  const html = fs.readFileSync(destinationPath, "utf8");

  if (!html || html.length === 0) {
    console.error("File is empty");
    process.exit(1);
  }

  const broken = html.split('playlistVideoListRenderer":{"contents":')[1];

  let c = 0;
  let slice = "";

  for (let i = 1; i < broken.length; i++) {
    if (broken[i] === "[") {
      c++;
    }
    if (broken[i] === "]") {
      c--;
    }
    if (c === -1) {
      slice = broken.slice(0, i + 1);
      break;
    }
  }

  const json = JSON.parse(slice);

  parseTimeFromPlaylist(json);
})(process.argv);
