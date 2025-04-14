import "./style.css";

const redLight$ = document.getElementById("red-light");
const yellowLight$ = document.getElementById("yellow-light");
const greenLight$ = document.getElementById("green-light");

redLight$?.classList.toggle("on");
setTimeout(() => {
  redLight$?.classList.toggle("on");
  yellowLight$?.classList.remove("on");
  greenLight$?.classList.toggle("on");
}, 4000);

setTimeout(() => {
  redLight$?.classList.remove("on");
  yellowLight$?.classList.toggle("on");
  greenLight$?.classList.toggle("on");
}, 8000);

setTimeout(() => {
  redLight$?.classList.toggle("on");
  yellowLight$?.classList.toggle("on");
  greenLight$?.classList.remove("on");
}, 10000);

setInterval(() => {
  setTimeout(() => {
    redLight$?.classList.toggle("on");
    yellowLight$?.classList.remove("on");
    greenLight$?.classList.toggle("on");
  }, 4000);

  setTimeout(() => {
    redLight$?.classList.remove("on");
    yellowLight$?.classList.toggle("on");
    greenLight$?.classList.toggle("on");
  }, 8000);

  setTimeout(() => {
    redLight$?.classList.toggle("on");
    yellowLight$?.classList.toggle("on");
    greenLight$?.classList.remove("on");
  }, 10000);
}, 10000);
