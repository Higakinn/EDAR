import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/現在地よりお店を検索/);
  expect(linkElement).toBeInTheDocument();
});
