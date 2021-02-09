import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Header from './components/Header'
import Footer from './components/Footer';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/現在地よりお店を検索/);
  expect(linkElement).toBeInTheDocument();
});


test('header: 指定した引数がレンダリングされているかどうか', () => {
  render(<Header title="Test" subtitle="testtest" />);
  const titleText = screen.getByText(/Test/);
  const subtitleText = screen.getByText(/testtest/);
  expect(titleText).toBeInTheDocument();
  expect(subtitleText).toBeInTheDocument();
});

test('footer: 指定した引数がレンダリングされているかどうか', () => {
  render(<Footer title="sample" description="Samplesample" />);
  const titleText = screen.getByText("sample");
  const descriptionText = screen.getByText("Samplesample");
  expect(titleText).toBeInTheDocument();
  expect(descriptionText).toBeInTheDocument();
});
