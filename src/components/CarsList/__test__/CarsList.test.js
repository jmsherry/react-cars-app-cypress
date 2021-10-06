// Cars List
import React from 'react';
import { render, screen } from '@testing-library/react';
import CarsList from '../CarsList';

test('renders learn react link', () => {
  render(<CarsList />);
  const linkElement = screen.getByText(/Cars List/i);
  expect(linkElement).toBeInTheDocument();
});