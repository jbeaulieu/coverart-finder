import { Box } from "@mui/material";
import type { Album } from "../../@types/album";
import memoize from 'memoize-one';
import { FixedSizeList, type ListChildComponentProps } from 'react-window';
import AlbumSearchResult from "../AlbumSearchResult";

export type Props = {
  albumList: Album[];
  selectedIndex: number;
  onSelect: (selected: number) => void;
};

// Helper method that runs for each album in the albumList prop, generating a
// corresponding AlbumSearchResult component. The react-window <FixedSizeList> component
// expects a child method like this which can be run to generate the components for each
// item in the list, rather than just an array of components. This method does that while
// keeping the AlbumSearchResult component independent.
function renderRow(props: ListChildComponentProps<Props>) {
  const { index, style, data } = props;
  const { albumList, selectedIndex, onSelect } = data;
  const album = albumList[index];

  return (
    <AlbumSearchResult album={album} selected={index === selectedIndex} onSelect={onSelect} style={style} />
  );
}

// This helper function memoizes incoming props,
// to avoid causing unnecessary re-renders pure Row components.
// This is only needed since we are passing multiple props with a wrapper object.
// If we were only passing a single, stable value (e.g. albums),
// we could just pass the value directly.
const createAlbumData = memoize((albumList: Album[], selectedIndex: number, onSelect: (selected: number) => void) => ({
  albumList,
  selectedIndex,
  onSelect,
}));

const AlbumListContainer = (props: Props) => {
  const { albumList, selectedIndex, onSelect } = props;

  const memoizedAlbumData = createAlbumData(albumList, selectedIndex, onSelect)

  return (
  <Box sx={{ width: '100%', height: 400, maxWidth: 450 }}>
    <FixedSizeList
      height={400}
      width={450}
      itemCount={albumList.length}
      itemData={memoizedAlbumData}
      itemSize={72}
      overscanCount={5}
    >
      {renderRow}
    </FixedSizeList>
  </Box>
  );
};

export default AlbumListContainer;
