import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o componente Pokemon', () => {
  const pikachu = pokemons[0];
  const { id, name, type, averageWeight: { value, measurementUnit }, image } = pikachu;
  const averageWeight = `Average weight: ${value} ${measurementUnit}`;

  test('se as informções do pokemon aparecem na tela', () => {
    renderWithRouter(<App />);
    const pokemonNameId = screen.getByTestId('pokemon-name');
    const pokemonTypeId = screen.getByTestId('pokemon-type');
    const pokemonWeightId = screen.getByTestId('pokemon-weight');
    const pokemonName = screen.getByText(`${name}`);
    const pokemonType = screen.getAllByText(`${type}`);
    const pokemonWeight = screen.getByText(averageWeight);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    const imageEl = screen
      .getByAltText(`${name} sprite`);

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toHaveLength(2);
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonNameId).toBeInTheDocument();
    expect(pokemonTypeId).toBeInTheDocument();
    expect(pokemonWeightId).toBeInTheDocument();
    expect(detailsLink).toBeInTheDocument();
    expect(imageEl).toBeInTheDocument();
    expect(imageEl).toHaveProperty('src', image);
  });

  test('se o link possui url /pokemon/<id>', () => {
    renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toHaveProperty('href', `http://localhost/pokemons/${id}`);
  });

  test('Teste se a aplicação é redirecionada ao clicar em um link', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se existe uma estrela nos pokemons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const checkbox = screen.getByRole('checkbox');
    userEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    history.push('/');
    expect(screen.getByText(/encountered/i)).toBeInTheDocument();
    const starPoke = screen.getByAltText(`${name} is marked as favorite`);
    expect(starPoke).toBeInTheDocument();
    expect(starPoke).toHaveAttribute('src', '/star-icon.svg');
  });
});
