import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SearchFilter = () => {
  const [filter, setFilter] = React.useState('');

  const handleChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="search-filter">Filter</InputLabel>
        <Select
          labelId="search-filter"
          id="filter-search-filter"
          value={filter}
          label="Filter"
          onChange={handleChange}
        >
          <MenuItem value={10}>Document</MenuItem>
          <MenuItem value={20}>Images</MenuItem>
          <MenuItem value={30}>Audio</MenuItem>

          <MenuItem value={40}>Video</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export default SearchFilter;
