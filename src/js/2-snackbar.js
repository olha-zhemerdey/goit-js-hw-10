// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const submitBtn = document.querySelector('[type="submit"]');
const form = document.querySelector('.promise-form');

form.addEventListener('submit', onSubmitForm);

function onSubmitForm(e) {
  e.preventDefault();
  const state = e.target.state.value;
  const delay = Number(e.target.delay.value);
  const submitPomise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
  submitPomise
    .then(delay =>
      iziToast.success({
        title: 'Resolve',
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      })
    )
    .catch(delay =>
      iziToast.error({
        title: 'Reject',
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      })
    );
}
