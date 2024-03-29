import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import Hidden from '@material-ui/core/Hidden';
import RestCard from './RestCard';
import { getFeaturedText, getRestaurantImage, minsAwayFromDistance } from './helpers';

const restListViewStyles = (theme) => ({
  appLogo: {
    fontWeight: 900,
    fontStyle: 'italic',
    textShadow: `0px 0px 2px ${blue[900]}`,
    marginBottom: theme.spacing.unit * 2
  },
  rootContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing.unit * 2
  },
  restListContainer: {
    overflow: 'scroll',
    maxHeight: '90vh'
  },
  searchContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
});

const RestListView = ({
  classes,
  restaurants,
  renderSearchInput,
  renderMyLocationButton,
  resultString
}) => {
  console.log(restaurants);
  return (
    <div className={classes.rootContainer}>
      <Typography variant="h4" gutterBottom className={classes.appLogo}>
        Foodsy
      </Typography>
      <Hidden mdUp>
        <div className={classes.searchContainer}>
          {renderMyLocationButton()}
          {renderSearchInput()}
        </div>
      </Hidden>
      <Typography variant="overline" gutterBottom>
        {resultString}
      </Typography>
      <div className={classes.restListContainer}> {restaurants.map((rest) => {
        const distance = Number((rest.distance || 0).toFixed(1));
        return (
          <RestCard
            key={rest.id}
            id={rest.id}
            description={rest.description}
            title={rest.title}
            image={getRestaurantImage(rest.images)}
            featuredText={getFeaturedText(rest.references)}
            openClose={rest.open_closed}
            distance={distance}
            rating={rest.rating}
            minsAway={minsAwayFromDistance(distance)}
          />
        );
      })}
      </div>
    </div>
  );
};

export default withStyles(restListViewStyles)(RestListView);
