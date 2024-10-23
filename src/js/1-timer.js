// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';

// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const dateInput = document.querySelector('#datetime-picker');
const timerBtn = document.querySelector('button[data-start]');
const daysE = document.querySelector('.value[data-days]');
const hoursE = document.querySelector('.value[data-hours]');
const minutesE = document.querySelector('.value[data-minutes]');
const secondsE = document.querySelector('.value[data-seconds]');

timerBtn.disable = true;

let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (Date.now() > selectedDates[0]) {
      timerBtn.disable = true;

      iziToast.error({
        title: 'Error',
        backgroundColor: 'tomato',
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '20',
        position: 'topRight',
        close: true,
        displayMode: 2,
      });
    } else {
      timerBtn.disable = false;
      iziToast.success({
        title: 'OK',
        message: 'You can press "Start"!',
      });
    }
  },
};

flatpickr(dateInput, options);

const currentDate = Date.now();

timerBtn.addEventListener('click', onClickStartBtn);

function onClickStartBtn() {
  timerBtn.disabled = true;
  dateInput.disabled = true;

  const timer = setInterval(() => {
    // const targetDate = new Date(input.value);
    const ms = userSelectedDate - currentDate;

    const { days, hours, minutes, seconds } = convertMs(ms);

    daysE.textContent = addLeadingZero(days);
    hoursE.textContent = addLeadingZero(hours);
    minutesE.textContent = addLeadingZero(minutes);
    secondsE.textContent = addLeadingZero(seconds);

    if (
      seconds === 0 &&
     minutes === 0 &&
      hours === 0 &&
     days === 0
    )

    // const isTimerFinished = [days, hours, minutes, seconds].every(
    //   value => value === 0
    // );

    // if (isTimerFinished)
      
      
      {
      clearInterval(timer);
      dateInput.isActive = true;
    }
  }, 1000);
}

const addLeadingZero = value => value.toString().padStart(2, '0');

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