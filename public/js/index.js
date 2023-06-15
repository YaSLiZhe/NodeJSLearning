/* eslint-disable */
import '@babel/polyfill';
import { bookTour } from './stripe';
import { login, logout } from './login';
import { displayMap } from './mapbox';
import { updateSettings } from './updateSettings';
import { signup } from './signup';

//DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const signupForm = document.querySelector('.form--signup');

//Values

//Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
if (logOutBtn) {
  logOutBtn.addEventListener('click', logout);
}
if (userDataForm) {
  userDataForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    const form = new FormData();
    console.log(form);
    form.append('email', document.getElementById('email').value);
    form.append('name', document.getElementById('name').value);
    form.append('photo', document.getElementById('photo').files[0]);
    updateSettings(form, 'data');
  });
}

if (userPasswordForm) {
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
    document.querySelector('.btn--save-password').textContent = 'Updating ...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password'
    );
    document.querySelector('.btn--save-password').textContent = 'save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });
}

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing... ';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    // Get the values from the input fields
    const name = document.getElementById('name').value;
    const passwordConfirm = document.getElementById('passwordConfirm').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    signup(name, email, password, passwordConfirm);
  });
}
