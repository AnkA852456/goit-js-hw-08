import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
const formData = {};

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailInputEl: document.querySelector('.feedback-form input'),
  textariaEl: document.querySelector('.feedback-form textarea'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.textariaEl.addEventListener('input', onTextariaInput);
refs.formEl.addEventListener('input', throttle(onFormInput, 500));

populatedTextarea();

function onFormSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onTextariaInput(e) {
  const message = e.target.value;
  console.log(message);
}

function populatedTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedSavedMassege = JSON.parse(savedMessage);

  if (savedMessage) {
    refs.textariaEl.value = parsedSavedMassege.message;
    refs.emailInputEl.value = parsedSavedMassege.email;
  }
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  console.log(formData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
