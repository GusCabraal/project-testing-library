import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente NotFound', () => {
  test('Teste se contém um heading h2 com o texto Page requested not found ', () => {
    renderWithRouter(<NotFound />);
    const notFoundTitle = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<NotFound />);
    const imageEl = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveProperty('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
