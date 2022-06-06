import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen
      .getByRole('heading', { name: /about pokédex/i, level: 2 });

    expect(titleAbout).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = screen
      .getByText(/This application simulates a Pokédex, a digital encyclopedia contai/i);
    const paragraph2 = screen
      .getByText(/One can filter Pokémons by type, and see more details for each one o/i);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imageEl = screen.getByAltText(/pokédex/i);
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
  //   test('Teste se a aplicação é redirecionada ao clicar em um link', async () => {
  //     const { history } = renderWithRouter(<App />);
  //     const homeLink = screen.getByRole('link', { name: /home/i });
  //     const aboutLink = screen.getByRole('link', { name: /about/i });
  //     const favoritePokeLink = screen.getByRole('link', { name: /favorite/i });

  //     userEvent.click(aboutLink);
  //     const titleAbout = screen.getByRole('heading', { name: /about/i });
  //     expect(titleAbout).toBeInTheDocument();

  //     userEvent.click(favoritePokeLink);
  //     const titleFavorite = screen.getByRole('heading', { name: /favorite/i });
  //     expect(titleFavorite).toBeInTheDocument();

  //     userEvent.click(homeLink);
  //     const titleHome = await screen
  //       .queryByRole('heading', { name: /encountered pokémons/i });
  //     expect(titleHome).toBeInTheDocument();

//     history.push('/pagina-nao-encontrada');
//     const titleNotFound = screen
//       .getByRole('heading', { name: /page requested not found/i });
//     expect(titleNotFound).toBeInTheDocument();
//   });
});
