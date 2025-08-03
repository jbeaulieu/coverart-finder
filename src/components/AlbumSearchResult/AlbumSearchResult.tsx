import { Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemText } from "@mui/material";

export type Props = {
  id: number;
  selected: boolean;
  artistName: string;
  albumName: string;
  albumThumbSrc?: string;
  onSelect: (selected: number) => void;
}

const AlbumSearchResult = (props: Props) => {

  const { id, selected, artistName, albumName, albumThumbSrc, onSelect } = props;

  return (
    <ListItem>
      <ListItemButton selected={selected} onClick={() => onSelect(id)}>
        <ListItemText
          primary={artistName}
          secondary={albumName}
        />
        <ListItemAvatar>
          <Avatar alt={albumName} src={albumThumbSrc} />
        </ListItemAvatar>
      </ListItemButton>
    </ListItem>
  );
};

export default AlbumSearchResult;
