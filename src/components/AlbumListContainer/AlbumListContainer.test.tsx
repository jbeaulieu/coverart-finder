import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AlbumListContainer from './AlbumListContainer';
import type { Props } from './AlbumListContainer';
import type { Album } from '../../@types/album';
import { createRef} from 'react';

const album0: Album = {
  id: 1767673630,
  name: 'Watch the Fire',
  artistName: 'Dashboard Confessional',
};

const album1: Album = {
  id: 276649794,
  name: 'Bad Attitude',
  artistName: 'Meat Loaf',
}

const album2: Album = {
  id: 580265083,
  name: 'Crazy World',
  artistName: 'Boys Like Girls',
}

const onSelect = vi.fn();

const defaultProps: Props = {
  albumList: [album0, album1, album2],
  listRef: createRef(),
  selectedAlbumId: album2.id,
  onSelect,
};

const renderAlbumListContainer = (props = defaultProps) => {
  return render(<AlbumListContainer {...props} />);
};

describe('Component AlbumListContainer', () => {

  describe('with default props', () => {
    it('renders without crashing', () => {
      const { asFragment } = renderAlbumListContainer();

      expect(asFragment()).toMatchSnapshot();
    });

    it('applies the "selected" prop correctly', () => {
      renderAlbumListContainer();

      const nonSelectedItem1 = screen.getByRole("button", { name: `${album0.name} ${album0.artistName}` });
      const nonSelectedItem2 = screen.getByRole("button", { name: `${album1.name} ${album1.artistName}` });
      const selectedItem = screen.getByRole("button", { name: `${album2.name} ${album2.artistName}` });

      expect(nonSelectedItem1).not.toHaveClass("Mui-selected");
      expect(nonSelectedItem2).not.toHaveClass("Mui-selected");
      expect(selectedItem).toHaveClass("Mui-selected");
    });
  });

  describe('on click', () => {
    it('invokes onSelect function', () => {
      renderAlbumListContainer();

      const itemButton = screen.getByRole("button", { name: `${album1.name} ${album1.artistName}` });

      fireEvent.click(itemButton);

      expect(onSelect).toHaveBeenCalledExactlyOnceWith(album1.id);
    });
  });
});
