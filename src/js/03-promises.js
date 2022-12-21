import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector("form");
const { delay, step, amount } = form;

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      };

      reject({ position, delay });
    }, delay);

  });
};

function onSucces({ position, delay }) {
  Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
  console.log("✅ Succes");
};

function onFailure({ position, delay }) {
  Notify.failure(`Rejected promise ${position} in ${delay}ms`);
  console.log("❌ Failure");
};

function onFormSubmit(e) {
  e.preventDefault();

  setDelay = delay.valueAsNumber;
  setStep = step.valueAsNumber;
  setAmount = amount.valueAsNumber;

  for (let i = 0; i < setAmount; i += 1) {
    const stepDelay = setDelay + setStep * i;
    const position = i + 1;

    createPromise(position, stepDelay)
      .then(onSucces)
      .catch(onFailure);
  };
};

form.addEventListener("submit", onFormSubmit);