import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import RestaurantMarker from './RestaurantMarker';

const restMapViewStyles = (theme) => ({
  root: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  fab: {
    margin: theme.spacing.unit,
  },
  mapHeader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    zIndex: 500,
    '&>span': {
      width: '45%'
    }
  },
  loginSignupContainer: {
    marginRight: theme.spacing.unit * 6,
    display: 'flex',
    justifyContent: 'flex-end'
  }
});


const RestMapView = ({ classes, restaurants, renderSearchInput }) => {
  let center = null;
  if (restaurants.length) {
    const { lat, lon } = restaurants[0];
    center = {
      lat, lng: lon
    };
  }
  return (
    <div className={classes.root}>
      <div className={classes.mapHeader}>
        <span>{renderSearchInput()}</span>
        <span className={classes.loginSignupContainer}>
          <Fab variant="extended" aria-label="Delete" className={classes.fab}>
            Login
          </Fab>
          <Fab variant="extended" aria-label="Delete" className={classes.fab}>
            SignUp
          </Fab>
        </span>
      </div>
      {center && (
        <GoogleMapReact
          // bootstrapURLKeys={{ key: /*API KEY HERE */'' }}
          center={center}
          defaultZoom={11}
        >
          {restaurants.map((rest) => (
            <RestaurantMarker
              key={rest.id}
              name={rest.title}
              lat={rest.lat}
              lng={rest.lon}
            />
          ))
          }

        </GoogleMapReact>
      )}
    </div>
  );
};

export default withStyles(restMapViewStyles)(RestMapView);
