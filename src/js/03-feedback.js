import throttle from 'lodash.throttle';

const STORAGE_KEY = 'feedback-form-state';
let formData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

const refs = {
  formEl: document.querySelector('.feedback-form'),
  emailInputEl: document.querySelector('.feedback-form input'),
  textariaEl: document.querySelector('.feedback-form textarea'),
};

refs.formEl.addEventListener('submit', onFormSubmit);
refs.formEl.addEventListener('input', throttle(onFormInput, 500));

populatedTextarea();

function onFormSubmit(e) {
  if (!formData.email || !formData.message) {
    alert('fill all fields');
    return;
  }
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(formData);
  formData = {};
}

function populatedTextarea() {
  const savedMessage = localStorage.getItem(STORAGE_KEY);
  const parsedSavedMassege = JSON.parse(savedMessage);

  if (parsedSavedMassege) {
    refs.textariaEl.value = parsedSavedMassege.message || '';
    refs.emailInputEl.value = parsedSavedMassege.email || '';
  }
}

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}
