import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

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
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
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
      />
      <Button type="submit" variant="contained" onClick={handleSubmit}>Go</Button>
    </Box>
  );
}

export default SearchContainer;
