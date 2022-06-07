import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o componente Pokemon details', () => {
  const pikachu = pokemons[0];
  const { name, summary, foundAt } = pikachu;
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('se as informações detalhadas do pokemon aparecem na tela', () => {
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    expect(detailsLink).not.toBeInTheDocument();

    const titleEl = screen.getByRole('heading', { name: `${name} Details` });
    expect(titleEl).toBeInTheDocument();

    const titleSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    const textSummary = screen.getByText(summary);
    expect(titleSummary).toBeInTheDocument();
    expect(textSummary).toBeInTheDocument();
  });

  test('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const titleEl = screen
      .getByRole('heading', { name: `Game Locations of ${name}`, level: 2 });
    expect(titleEl).toBeInTheDocument();

    const locationImages = screen.getAllByAltText(`${name} location`);
    foundAt.forEach(({ location, map }, index) => {
      const locationName = screen.getByText(location);
      expect(locationName).toBeInTheDocument();
      expect(locationImages[index]).toBeInTheDocument();
      expect(locationImages[index]).toHaveAttribute('src', map);
    });
  });
  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const detailsLink = screen.queryByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    const starPoke = screen.queryByAltText(`${name} is marked as favorite`);
    expect(starPoke).toBeInTheDocument();
    expect(starPoke).toHaveAttribute('src', '/star-icon.svg');

    userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    expect(starPoke).not.toBeInTheDocument();
  });
});
