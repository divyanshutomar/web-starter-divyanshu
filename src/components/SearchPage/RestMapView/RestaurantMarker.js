import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import RestaurantIcon from '@material-ui/icons/Restaurant';

const styles = (theme) => ({
  white: {
    color: '#fff'
  }
});

const RestaurantMarker = ({ classes, name }) => {
  return (
    <Tooltip className={classes.white} title={name}>
      <RestaurantIcon className={classes.white} />
    </Tooltip>
  );
};

export default withStyles(styles)(RestaurantMarker);
