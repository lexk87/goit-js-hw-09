import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
require("flatpickr/dist/themes/material_blue.css");

const elements = {
    datetimePickerEl: document.querySelector("#datetime-picker"),
    startBtnEl: document.querySelector("[data-start]"),
    daysAmountEl: document.querySelector("[data-days]"),
    hoursAmountEl: document.querySelector("[data-hours]"),
    minutesAmountEl: document.querySelector("[data-minutes]"),
    secondsAmountEl: document.querySelector("[data-seconds]"),
};

const {
    datetimePickerEl,
    startBtnEl,
    daysAmountEl,
    hoursAmountEl,
    minutesAmountEl,
    secondsAmountEl,
} = elements;

startBtnEl.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] <= options.defaultDate) {
            startBtnEl.disabled = true;
            Notify.failure("Please, choose a date in the future");
            return;
        }

        startBtnEl.disabled = false;
        Notify.success("The timer is ready to launch");
    },
};

const calendar = flatpickr(datetimePickerEl, options);

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
};

function updateTimer({ days, hours, minutes, seconds }) {
    daysAmountEl.textContent = days;
    hoursAmountEl.textContent = hours;
    minutesAmountEl.textContent = minutes;
    secondsAmountEl.textContent = seconds;
};

function onStartBtnClick() {
  startBtnEl.disabled = true;
  datetimePickerEl.disabled = true;
  const chosenDate = calendar.selectedDates[0].getTime();

  const intervalId = setInterval(() => {
    const deltaTime = chosenDate - Date.now();
    const deltaTimeConvert = convertMs(deltaTime);

    if (deltaTime <= 0) {
      startBtnEl.disabled = false;
      datetimePickerEl.disabled = false;
        clearInterval(intervalId);
        return
      }
        updateTimer(deltaTimeConvert);
  }, 1000);
};

startBtnEl.addEventListener("click", onStartBtnClick);