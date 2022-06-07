import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const titleAbout = screen
      .getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(titleAbout).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const paragraph1 = screen
      .getByText(/This application simulates a Pokédex, a digital encyclopedia contai/i);
    const paragraph2 = screen
      .getByText(/One can filter Pokémons by type, and see more details for each one o/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const imageEl = screen.getByAltText(/pokédex/i);
    const URL_IMAGE = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveProperty('src', URL_IMAGE);
  });
});
