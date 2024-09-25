import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './SearchBar.css'; 

function SearchBar() {
    return (
        <div className="search-bar-container">
            <Paper
                variant='outlined'
                sx={{ width: '800px', p: '2px 4px', display: 'flex', alignItems: 'center', boxShadow: 'none', borderRadius: '50px' }}
            >
                <IconButton sx={{ p: '10px' }} aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search a course to get started (e.g. CHEM 111)"
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                </IconButton>
            </Paper>
        </div>
    );
}

export default SearchBar;
