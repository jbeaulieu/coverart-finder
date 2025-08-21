import type { CSSProperties } from "react";
import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";
import type { Album } from "../../@types/album";

export interface Props {
  album: Album;
  selected: boolean;
  onSelect: (selectedId: number) => void;
  style: CSSProperties;
}

const AlbumSearchResult = (props: Props) => {

  const { album, selected, onSelect, style } = props;

  return (
    <ListItem key={album.id} style={style} disablePadding>
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
