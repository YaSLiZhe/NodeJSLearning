/* eslint-disable */
import '@babel/polyfill';
import { login } from './login';
import { displayMap } from './mapbox';

//DOM elements
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form');

//Values

//Delegation
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}
if (loginForm) {
  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission
    // Get the values from the input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    login(email, password);
  });
}
