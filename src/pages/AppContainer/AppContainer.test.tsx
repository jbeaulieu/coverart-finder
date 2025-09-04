import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SettingsContextProvider from '../../context/SettingsContextProvider';
import AppContainer from './AppContainer';

const renderAppContainer = () => {
  return render(
    <SettingsContextProvider>
      <AppContainer />
    </SettingsContextProvider>
  );
};

describe('Component AppContainer', () => {
  it('renders without crashing', () => {
    const { asFragment } = renderAppContainer();

    expect(asFragment()).toMatchSnapshot();
  });
});
