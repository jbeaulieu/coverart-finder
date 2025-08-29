import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

const renderApp = () => {
  return render(<App />);
};

describe('Component App', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderApp();

    expect(asFragment()).toMatchSnapshot();
  });
});
