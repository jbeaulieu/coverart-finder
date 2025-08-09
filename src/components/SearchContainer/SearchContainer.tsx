import { IconButton, InputAdornment } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export type Props = {
  doSearch: (searchParam: string) => void;
};

const SearchContainer = (props: Props) => {

  const { doSearch } = props;
  const [searchParam, setSearchParam] = useState('');

  const handleSubmit = () => doSearch(searchParam);

  return (
    <Box
      component="form"
      sx={{ '& > :not(style)': { marginBottom: 2 } }}
      width={1}
      noValidate
      autoComplete="off"
      onSubmit={(event) => event.preventDefault()}
    >
      <TextField
        variant="outlined"
        id="search-container"
        label="Search by Artist / Album"
        value={searchParam}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setSearchParam(event.target.value);
        }}
        fullWidth
        slotProps={{
          input: {
            endAdornment:
              <InputAdornment position="end">
                <IconButton aria-label="search" onClick={handleSubmit} edge="end" type="submit">
                  {<SearchIcon />}
                </IconButton>
              </InputAdornment>,
            },
          }}
      />
    </Box>
  );
}

export default SearchContainer;
