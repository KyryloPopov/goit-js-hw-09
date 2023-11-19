import Notiflix from 'notiflix';

const form = document.querySelector('form');
form.addEventListener('submit', generatePromises);

function generatePromises(event) {
  event.preventDefault();
  const amount = Number(form.elements.amount.value);
  const delay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  for (let i = 0; i < amount; i++) {
    createPromise(i + 1, delay + step * i);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(position, delay);
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(position, delay);
      } else {
        reject(position, delay);
      }
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });
}
