const refs = {
  hours: document.querySelector(".hours"),
  minutes: document.querySelector(".minutes"),
  seconds: document.querySelector(".seconds"),
  start: document.querySelector(".start"),
  stop: document.querySelector(".stop"),
  pause: document.querySelector(".pause"),
};
let time = null;
let intervalId = null;
let current = null;
let pauseTime = null;
let pauseDiff = null;
const makePrettyTime = (number) => {
  if (number >= 10) return number;
  return `0${number}`;
};
const makeTime = () => {
  let diff = null;
  if (pauseDiff) {
    diff = current - time - pauseDiff;
  } else diff = current - time;
  const hours = Math.floor(diff / 3600000);
  const minutes = Math.floor((diff - hours * 3600000) / 60000);
  const seconds = Math.floor((diff - minutes * 60000 - hours * 3600000) / 1000);
  refs.hours.innerHTML = makePrettyTime(hours);
  refs.minutes.innerHTML = makePrettyTime(minutes);
  refs.seconds.innerHTML = makePrettyTime(seconds);
};
const onStart = () => {
  if (!time) {
    time = Date.now();
  }
  if (pauseTime) {
    pauseDiff += Date.now() - pauseTime;
  }
  intervalId = setInterval(() => {
    current = Date.now();
    makeTime();
  }, 1000);
  refs.stop.disabled = false;
  refs.pause.disabled = false;
  refs.start.disabled = true;
};
const onStop = () => {
  clearInterval(intervalId);
  time = null;
  pauseTime = null;
  refs.hours.innerHTML = makePrettyTime(0);
  refs.minutes.innerHTML = makePrettyTime(0);
  refs.seconds.innerHTML = makePrettyTime(0);
  refs.start.disabled = false;
  refs.stop.disabled = true;
  refs.pause.disabled = true;
};
const onPause = () => {
  pauseTime = Date.now();
  clearInterval(intervalId);
  refs.start.disabled = false;
  refs.stop.disabled = true;
  refs.pause.disabled = true;
};
refs.start.addEventListener("click", onStart);
refs.stop.addEventListener("click", onStop);
refs.pause.addEventListener("click", onPause);
