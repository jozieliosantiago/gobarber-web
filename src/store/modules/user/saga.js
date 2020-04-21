import { takeLatest, call, put, all } from 'redux-saga/effects';
import { store } from 'react-notifications-component';

import api from '~/services/api';

import { updatedProfileSuccess, updatedProfileFailure } from './actions';

const notification = {
  success: {
    title: 'Sucesso!',
    message: 'Perfil atualizado!',
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animated', 'fadeIn'],
    animationOut: ['animated', 'fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  },
  error: {
    title: 'Falha!',
    message: 'Erro ao atualizar perfil, confira seus dados',
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

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload.data;

    const profile = {
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    store.addNotification({ ...notification.success });

    yield put(updatedProfileSuccess(response.data));
  } catch (error) {
    store.addNotification({ ...notification.error });
    yield put(updatedProfileFailure);
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
