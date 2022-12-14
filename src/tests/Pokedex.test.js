import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o componente Pokedex', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Teste se a página contém um heading h2 com Encountered pokémons', () => {
    const titleEl = screen
      .queryByRole('heading', { name: /encountered pokémons/i, level: 2 });
    expect(titleEl).toBeInTheDocument();
  });

  test('se é exibido o próximo pokémon da lista quando o botão é clicado', () => {
    const pokemonNames = pokemons.map(({ name }) => name);
    pokemonNames.push('Pikachu');

    const buttonEl = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonEl).toBeInTheDocument();

    pokemonNames.forEach((pokemonName) => {
      expect(screen.getByText(pokemonName)).toBeInTheDocument();
      userEvent.click(buttonEl);
    });
  });
  test('Teste se é mostrado apenas um pokémon por vez', () => {
    const pokemonNames = pokemons.map(({ name }) => name);
    pokemonNames.shift();

    pokemonNames.forEach((pokemonName) => {
      expect(screen.queryByText(pokemonName)).not.toBeInTheDocument();
    });
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    const pokemonsTypes = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];

    const buttonAll = screen.getByRole('button', { name: 'All' });
    expect(buttonAll).toBeInTheDocument();

    pokemonsTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
      expect(buttonType).toHaveAttribute('data-testid', 'pokemon-type-button');
    });
  });
  test('A Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const pokemonsTypes = [...new Set(pokemons
      .reduce((types, { type }) => [...types, type], []))];

    pokemonsTypes.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      userEvent.click(buttonType);
      const textType = screen.getByTestId('pokemon-type');
      expect(textType).toBeInTheDocument();
    });
  });
  test('Testando o botão All', () => {
    const pokemonNames = pokemons.map(({ name }) => name);
    pokemonNames.push('Pikachu');

    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    const buttonAll = screen.getByRole('button', { name: 'All' });

    userEvent.click(buttonAll);
    pokemonNames.forEach((pokemonName) => {
      expect(screen.getByText(pokemonName)).toBeInTheDocument();
      userEvent.click(buttonNext);
    });
  });
});
