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
  // const titleEl = screen.getByRole('heading', { name: /minha página/i });

  // expect(aboutMeLink).toBeInTheDocument();

  // userEvent.click(aboutMeLink);

  // const aboutMeTitle = screen.getByRole('heading', { name: /sobre mim/i });
  // expect(aboutMeTitle).toBeInTheDocument();

  //   test('Verifica se aparece "minha página" e se navega para "projetos"', () => {
  //     render(
  //       <MemoryRouter>
  //         <App />
  //       </MemoryRouter>,
  //     );
  //     const titleEl = screen.getByRole('heading', { name: /minha página/i });
  //     expect(titleEl).toBeInTheDocument();

  //     const projectsLink = screen.getByRole('link', { name: /projetos/i });
  //     expect(projectsLink).toBeInTheDocument();

  //     userEvent.click(projectsLink);

  //     const projectsTitle = screen.getByRole('heading', {
  //       name: /meus projetos/i,
  //     });
  //     expect(projectsTitle).toBeInTheDocument();
  //   });

  //   test('Verifica se a pagina 404 é renderizada corretamente', () => {
  //     // const history = createMemoryHistory()
  //     // render(
  //     //   <Router history={history}>
  //     //     <App />
  //     //   </Router>
  //     // );
  //     // history.push('/lalaland')

  //     const { history } = renderWithRouter(<App />);
  //     history.push('/lalaland');

  //     const notFoundTitle = screen.getByRole('heading', { name: /404/i });
  //     expect(notFoundTitle).toBeInTheDocument();
  //   });
});
