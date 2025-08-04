import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AlbumSearchResult from './AlbumSearchResult';
import type { Props } from './AlbumSearchResult';
import type { Album } from '../../@types/album';

const album: Album = {
  id: 1767673630,
  name: 'Boys Like Girls',
  artistName: 'Watch the Fire'
}

const onSelect = vi.fn();

const defaultProps: Props = {
  album,
  selected: false,
  onSelect,
  style: { display: 'flex' }
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

      const itemButton = screen.getByRole("button", { name: `${album.name} ${album.artistName}` });

      fireEvent.click(itemButton);

      expect(onSelect).toHaveBeenCalledExactlyOnceWith(album.id);
    });
  });
});
