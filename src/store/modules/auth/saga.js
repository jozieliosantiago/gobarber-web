import { takeLatest, call, put, all } from 'redux-saga/effects';
import { store } from 'react-notifications-component';
import api from '~/services/api';
import history from '~/services/history';

import { signInSuccess, signFailure } from './actions';

const notification = {
  signIn: {
    title: 'Falha no login',
    message: 'Verique seus dados de acesso!',
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  },
  signUp: {
    title: 'Falha no cadastro',
    message: 'Verique os dados informados!',
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  },
};

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      store.addNotification({ ...notification.signIn });
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (error) {
    store.addNotification({ ...notification.signIn });
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    history.push('/');
  } catch (error) {
    store.addNotification({ ...notification.signUp });

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
