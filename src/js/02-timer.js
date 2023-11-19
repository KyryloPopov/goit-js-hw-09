import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

// змінна для кнопки
const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;
startButton.addEventListener('click', startTimer);

// масив змінних ".value" на таймері
const displayTime = {
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

let timerId;

// створення елементу flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startButton.disabled = false;
    }
  },
};

const datePicker = flatpickr('#datetime-picker', options);

function startTimer() {
  startButton.disabled = true;
  timerId = setInterval(() => {
    const timeLeft = datePicker.selectedDates[0].getTime() - Date.now();
    const convertedParameters = convertMs(timeLeft);
    renderValues(convertedParameters);
    if (!timeLeftCheck(convertedParameters)) {
      clearInterval(timerId);
      Notiflix.Notify.success('Ding!');
    }
  }, 1000);
}

//рендер значень таймера
function renderValues(convertedParameters) {
  Object.keys(displayTime).forEach(key => {
    const keyData = convertedParameters[key];
    displayTime[key].textContent = addLeadingZero(keyData.toString());
  });
}

//перевірка, чи не закінчився таймер (намагався через перевірку TimeLeft, проте там не виходило отримати точне число 0 при різниці)
function timeLeftCheck(time) {
  for (const arg in time) {
    if (time[arg]) {
      return true;
    }
  }
  return false;
}

// додавання 0 до інтерфейсу таймера
function addLeadingZero(value) {
  return value.padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
