import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GoogleMapReact from 'google-map-react';
import RestaurantMarker from './RestaurantMarker';

const restMapViewStyles = (theme) => ({
  root: {
    width: '100%',
    height: '100%'
  }
});


const RestMapView = ({ classes, restaurants }) => {
  let defaultCenter = null;
  if (restaurants.length) {
    const { lat, lon } = restaurants[0];
    defaultCenter = {
      lat, lng: lon
    };
  }
  return (
    <div className={classes.root}>
      {defaultCenter && (
        <GoogleMapReact
        // bootstrapURLKeys={{ key: /*API KEY HERE */'' }}
          defaultCenter={defaultCenter}
          defaultZoom={14}
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
