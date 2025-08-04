import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type { Album } from "../../@types/album";

export type Props = {
  album: Album;
  selected: boolean;
  onSelect: (selected: number) => void;
}

const AlbumSearchResult = (props: Props) => {

  const { album, selected, onSelect } = props;

  return (
    <ListItem>
      <ListItemButton selected={selected} onClick={() => onSelect(album.id)}>
        <ListItemText
          primary={album.name}
          secondary={album.artistName}
        />
        <ListItemAvatar>
          <Avatar alt={album.name} src={album.thumbnailSrc} />
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  );
};

export default AlbumSearchResult;
