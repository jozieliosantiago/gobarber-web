import React from 'react';
import logo from '~/assets/img/logo.svg';
import { Container } from './styles';

export default function Loader() {
  return (
    <Container>
      <img src={logo} alt="" />
      <p>Carregando...</p>
    </Container>
  );
}
