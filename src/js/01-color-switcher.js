const elements = {
    bodyEl: document.querySelector("body"),
    startBtnEl: document.querySelector("[data-start]"),
    stopBtnEl: document.querySelector("[data-stop]"),
};
const { bodyEl, startBtnEl, stopBtnEl } = elements;
let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

function onStartBtnClick() {
    intervalId = setInterval(() => {
        bodyEl.style.backgroundColor = getRandomHexColor();
    }, 1000);
    startBtnEl.setAttribute("disabled", "disabled");
};

function onStopBtnClick() {
    startBtnEl.removeAttribute("disabled");
    clearInterval(intervalId);
}

startBtnEl.addEventListener("click", onStartBtnClick);
stopBtnEl.addEventListener("click", onStopBtnClick);