export default function timeAgo(time) {
  switch (typeof time) {
    case "number":
      break;
    case "string":
      time = +new Date(time);
      break;
    case "object":
      if (time.constructor === Date) time = time.getTime();
      break;
    default:
      time = +new Date();
  }
  var time_formats = [
    [60, "секунд", 1], // 60
    [120, "1 хвилина тому", "через 1 хвилину"], // 60*2
    [3600, "хвилини", 60], // 60*60, 60
    [7200, "1 година тому", "через 1 годину"], // 60*60*2
    [86400, "години", 3600], // 60*60*24, 60*60
    [172800, "Вчора", "Завтра"], // 60*60*24*2
    [604800, "дні", 86400], // 60*60*24*7, 60*60*24
    [1209600, "Минолого тижня", "Наступного тижня"], // 60*60*24*7*4*2
    [2419200, "тижні", 604800], // 60*60*24*7*4, 60*60*24*7
    [4838400, "Минулого місяця", "Наступного місяця"], // 60*60*24*7*4*2
    [29030400, "ьісяці", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
    [58060800, "Минулого року", "Наступного року"], // 60*60*24*7*4*12*2
    [2903040000, "роки", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
  ];
  var seconds = (+new Date() - time) / 1000,
    token = "тому",
    list_choice = 1;

  if (seconds === 0) {
    return "тільки що";
  }
  if (seconds < 0) {
    seconds = Math.abs(seconds);
    token = "потому";
    list_choice = 2;
  }
  var i = 0,
    format;
  while ((format = time_formats[i++]))
    if (seconds < format[0]) {
      if (typeof format[2] == "string") return format[list_choice];
      else
        return Math.floor(seconds / format[2]) + " " + format[1] + " " + token;
    }
  return time;
}
