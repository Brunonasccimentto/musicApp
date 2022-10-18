import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText("Faça o login ter acesso ao Nuzzer");
  expect(linkElement).toBeInTheDocument();
});


