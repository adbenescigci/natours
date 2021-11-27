/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const res = await axios({
      method: 'POST',
      url: 'http://127.0.0.1:8000/api/v1/users/signup',
      data: {
        name,
        email,
        password,
        passwordConfirm,
      },
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your request was sent your email succesfully!');
      window.setTimeout(() => {
        location.assign('/');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const activate = async (jwt) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `http://127.0.0.1:8000/api/v1/users/activateAccount/${jwt}`,
    });

    if (res.data.status === 'success') {
      showAlert('success', 'Your account was activated');
      window.setTimeout(() => {
        location.assign('/');
      }, 2500);
    }
  } catch (err) {
    location.assign('/');
    showAlert('error', err.response.data.message);
  }
};
