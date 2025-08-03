import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchContainer from './SearchContainer';
import type { Props } from './SearchContainer';

const doSearch = vi.fn();

const defaultProps: Props = {
  doSearch
};

const renderSearchContainer = (props = defaultProps) => {
  return render(<SearchContainer {...props} />);
};

describe('Component SearchContainer', () => {

  it('renders without crashing', () => {
    const { asFragment } = renderSearchContainer();

    expect(asFragment()).toMatchSnapshot();
  });

  describe('on submit', () => {
    it('invokes search function', () => {
      renderSearchContainer();

      const searchField = screen.getByLabelText("Search by Artist / Album");
      const button = screen.getByRole("button", { name: "Go"});

      fireEvent.change(searchField, { target: { value: 'Meat Loaf' } });
      fireEvent.click(button);

      expect(doSearch).toHaveBeenCalledExactlyOnceWith('Meat Loaf');
    });
  });
});
