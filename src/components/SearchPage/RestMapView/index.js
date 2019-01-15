import React from 'react';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import PinIcon from '@material-ui/icons/PersonPinCircle';
import Tooltip from '@material-ui/core/Tooltip';
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
  },
  loginSignupContainer: {
    marginRight: theme.spacing.unit * 6,
    display: 'flex',
    justifyContent: 'flex-end',
    // width: '40%'
  },
  searchLocationContainer: {
    display: 'flex',
    flex: 1
  },
  transparentBtn: {
    color: '#fff',
    backgroundColor: 'rgba(255,255,255,0.3)',
    '&:hover': {
      backgroundColor: 'rgba(255,255,255,0.3)'
    }
  },
  signupBtn: {
    color: '#000',
    backgroundColor: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
    }
  }
});

const YouMarker = () => (
  <Tooltip title="You">
    <PinIcon />
  </Tooltip>
);

const RestMapView = ({
  classes,
  restaurants,
  renderSearchInput,
  renderMyLocationButton,
  currentLocation
}) => {
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
        <span className={classes.searchLocationContainer}>
          {renderMyLocationButton()}
          {renderSearchInput()}
        </span>
        <span className={classes.loginSignupContainer}>
          <Fab variant="extended" aria-label="Delete" className={classes.fab} classes={{ root: classes.transparentBtn }}>
            Login
          </Fab>
          <Fab variant="extended" aria-label="Delete" className={classes.fab} classes={{ root: classes.signupBtn }}>
            SignUp
          </Fab>
        </span>
      </div>
      {center && (
        <GoogleMapReact
          // bootstrapURLKeys={{ key: /*API KEY HERE */'' }}
          center={center}
          defaultZoom={13}
        >
          {currentLocation
            && (
              <YouMarker lat={currentLocation.lat} lng={currentLocation.lon} />
            )}
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
