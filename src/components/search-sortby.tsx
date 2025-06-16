import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SortBy = () => { 
  const [sort, setSort] = React.useState('');

  const handleChange = (event) => {
    setSort(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="search-sortby">Sort by</InputLabel>
        <Select
          labelId="search-sortby"
          id="search-sort-by"
          value={sort}
          label="Sort"
          onChange={handleChange}
        >
          <MenuItem value={10}>Newest first</MenuItem>
          <MenuItem value={20}>Oldest first</MenuItem>
          <MenuItem value={30}>Largest first</MenuItem>

          <MenuItem value={30}>Smallest first</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


export default SortBy;
