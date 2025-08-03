import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AlbumSearchResult from './AlbumSearchResult';
import type { Props } from './AlbumSearchResult';

const albumId = 1767673630;
const artistName = 'Boys Like Girls';
const albumName = 'Watch the Fire';
const onSelect = vi.fn();

const defaultProps: Props = {
  id: albumId,
  selected: false,
  artistName,
  albumName,
  albumThumbSrc: undefined,
  onSelect
};

const renderSearchContainer = (props = defaultProps) => {
  return render(<AlbumSearchResult {...props} />);
};

describe('Component SearchContainer', () => {

  it('renders without crashing', () => {
    const { asFragment } = renderSearchContainer();

    expect(asFragment()).toMatchSnapshot();
  });

  describe('on click', () => {
    it('invokes onSelect function', () => {
      renderSearchContainer();

      const itemButton = screen.getByRole("button", { name: `${artistName} ${albumName}` });

      fireEvent.click(itemButton);

      expect(onSelect).toHaveBeenCalledExactlyOnceWith(albumId);
    });
  });
});
