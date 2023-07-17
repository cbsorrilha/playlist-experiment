const calculateTime = require("./utils/calculate-time");
module.exports = function parseTimeFromPlaylist(yt) {
  const l = yt.reduce((list, { playlistVideoRenderer }) => {
    const { title, videoId, lengthText } = playlistVideoRenderer;
    console.log(
      `${title.runs[0].text} https://www.youtube.com/watch?v=${videoId} ${lengthText.simpleText}`
    );
    list.push(lengthText.simpleText);
    return list;
  }, []);
  console.log("Total videos: ", l.length);
  console.log(calculateTime(l));
};
