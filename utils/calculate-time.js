module.exports = function calculateTime(times) {
  let totalHours = 0;
  let totalMinutes = 0;
  let totalSeconds = 0;

  for (const time of times) {
    const [minutes, seconds] = time.split(":");

    const parsedMinutes = parseInt(minutes, 10);
    const parsedSeconds = parseInt(seconds, 10);

    totalMinutes += parsedMinutes;
    totalSeconds += parsedSeconds;
  }

  if (totalSeconds >= 60) {
    const additionalMinutes = Math.floor(totalSeconds / 60);
    totalMinutes += additionalMinutes;
    totalSeconds %= 60;
  }

  if (totalMinutes >= 60) {
    const additionalHours = Math.floor(totalMinutes / 60);
    totalHours += additionalHours;
    totalMinutes %= 60;
  }

  // Format the time
  const formattedTime = `${totalHours}:${totalMinutes
    .toString()
    .padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;

  return formattedTime;
};
