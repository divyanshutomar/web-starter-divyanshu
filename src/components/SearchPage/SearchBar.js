import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';


const searchBarStyles = (theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: theme.spacing.unit * 3,
    margin: theme.spacing.unit
  },
  iconButton: {
    padding: 10,
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4,
  },
});

const SearchBar = ({ classes }) => {
  return (
    <Paper className={classes.root} elevation={1}>

      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      <Divider className={classes.divider} />
      <InputBase fullWidth className={classes.input} placeholder="Search food in your area..." />
    </Paper>
  );
};

export default withStyles(searchBarStyles)(SearchBar);
