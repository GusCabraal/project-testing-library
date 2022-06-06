import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Testando o componente App', () => {
  test('Teste se o topo da aplicação contém um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokeLink = screen.getByRole('link', { name: /favorite/i });

    expect(homeLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(favoritePokeLink).toBeInTheDocument();
  });
  test('Teste se a aplicação é redirecionada ao clicar em um link', async () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    const aboutLink = screen.getByRole('link', { name: /about/i });
    const favoritePokeLink = screen.getByRole('link', { name: /favorite/i });

    userEvent.click(aboutLink);
    const titleAbout = screen.getByRole('heading', { name: /about/i });
    expect(titleAbout).toBeInTheDocument();

    userEvent.click(favoritePokeLink);
    const titleFavorite = screen.getByRole('heading', { name: /favorite/i });
    expect(titleFavorite).toBeInTheDocument();

    userEvent.click(homeLink);
    const titleHome = await screen
      .queryByRole('heading', { name: /encountered pokémons/i });
    expect(titleHome).toBeInTheDocument();

    history.push('/pagina-nao-encontrada');
    const titleNotFound = screen
      .getByRole('heading', { name: /page requested not found/i });
    expect(titleNotFound).toBeInTheDocument();
  });
});
