import "./style.css";

const redLight$ = document.getElementById("red-light");
const yellowLight$ = document.getElementById("yellow-light");
const greenLight$ = document.getElementById("green-light");

const DURATION_RED = 4000;
const DURATION_YELLOW = 2000;
const DURATION_GREEN = 4000;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const changeLights = (red: boolean, yellow: boolean, green: boolean) => {
  redLight$?.classList.toggle("on", red);
  yellowLight$?.classList.toggle("on", yellow);
  greenLight$?.classList.toggle("on", green);
};

const initialize = async () => {
  while (true) {
    changeLights(true, false, false);
    await delay(DURATION_RED);

    changeLights(false, false, true);
    await delay(DURATION_GREEN);

    changeLights(false, true, false);
    await delay(DURATION_YELLOW);
  }
};

initialize();

/*  My Awful Answer*/
// redLight$?.classList.toggle("on");
// setTimeout(() => {
//   redLight$?.classList.toggle("on");
//   yellowLight$?.classList.remove("on");
//   greenLight$?.classList.toggle("on");
// }, 4000);

// setTimeout(() => {
//   redLight$?.classList.remove("on");
//   yellowLight$?.classList.toggle("on");
//   greenLight$?.classList.toggle("on");
// }, 8000);

// setTimeout(() => {
//   redLight$?.classList.toggle("on");
//   yellowLight$?.classList.toggle("on");
//   greenLight$?.classList.remove("on");
// }, 10000);

// setInterval(() => {
//   setTimeout(() => {
//     redLight$?.classList.toggle("on");
//     yellowLight$?.classList.remove("on");
//     greenLight$?.classList.toggle("on");
//   }, 4000);

//   setTimeout(() => {
//     redLight$?.classList.remove("on");
//     yellowLight$?.classList.toggle("on");
//     greenLight$?.classList.toggle("on");
//   }, 8000);

//   setTimeout(() => {
//     redLight$?.classList.toggle("on");
//     yellowLight$?.classList.toggle("on");
//     greenLight$?.classList.remove("on");
//   }, 10000);
// }, 10000);
