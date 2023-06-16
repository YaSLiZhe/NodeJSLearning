import axios from 'axios';
import { showAlert } from './alerts';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });
    console.log(res.data);
    if (res.data.status === 'success') {
      showAlert('success', 'Sing up successfully!');
      window.setTimeout(() => {
        location.assign('/me');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err);
    console.log(err);
  }
};
