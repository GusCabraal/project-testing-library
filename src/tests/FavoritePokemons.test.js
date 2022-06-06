import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente FavoritePokemons', () => {
  test('Teste se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const textEl = screen.getByText(/No favorite pokemon found/i);

    expect(textEl).toBeInTheDocument();
  });
});
