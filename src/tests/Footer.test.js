import React from 'react';
import { getByAltText, screen, fireEvent } from '@testing-library/react';
import App from '../App';
import Comidas from '../pages/Comidas';
import renderWithRouter from './RenderWithRouter';
import Provider from '../hooks/Provider';

describe('Footer test', () => {
  // it('test about a pathname is /', () => {
  //   const { history } = renderWithRouter(<App />);
  //   const { pathname } = history.location;

  //   expect(pathname).toBe('/comidas');
  // });

  // it('test if Login words have in screen', () => {
  //   renderWithRouter(<App />);
  //   const login = screen.getByText(/Login/i);

  //   expect(login).toBeInTheDocument();
  // });

  // it('test if Login words have in screen', () => {
  //   renderWithRouter(<App />);
  //   const login = screen.getByText(/Login/i);
  //   expect(login).toBeInTheDocument();
  // });

  it('test button explore in footer.js', () => {
    const { history, getByTestId } = renderWithRouter(<Comidas />);

    // history.push('/comidas');

    // const { pathname } = history.location;

    // expect(history.location.pathname).toBe('/comidas');

    const button = getByTestId('explore-bottom-link');

    fireEvent.click(button);

    expect(history.location.pathname).toEqual('/explorar');
  });
});