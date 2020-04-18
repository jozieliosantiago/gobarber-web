import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import logo from '~/assets/img/logo.svg';

export default function SignIn() {
  const schema = Yup.object().shape({
    name: Yup.string().required('O nome é obrigatório'),
    email: Yup.string()
      .email('Insira um email válido')
      .required('O email é obrigatório'),
    password: Yup.string()
      .min(6, 'Mínimo 6 caracteres')
      .required('A senha é obrigatória'),
  });

  function handleSubmit(data) {
    console.log(data);
  }

  return (
    <>
      <img src={logo} alt="GoBarber" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Nome completo" />
        <Input name="email" type="email" placeholder="E-mail" />
        <Input name="password" type="password" placeholder="Senha" />

        <button type="submit">Criar conta</button>
        <Link to="/">Já tenho uma conta</Link>
      </Form>
    </>
  );
}
