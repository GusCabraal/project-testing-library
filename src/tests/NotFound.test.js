import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente NotFound', () => {
  beforeEach(() => {
    renderWithRouter(<NotFound />);
  });
  test('Teste se contém um heading h2 com o texto Page requested not found ', () => {
    const notFoundTitle = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(notFoundTitle).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const URL_IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imageEl = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveProperty('src', URL_IMAGE);
  });
});
