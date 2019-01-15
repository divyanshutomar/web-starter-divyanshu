import React, { Component } from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import PinIcon from '@material-ui/icons/PersonPinCircle';
import { withStyles } from '@material-ui/core/styles';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';
import RestListView from './RestListView';
import RestMapView from './RestMapView';
import SearchBar from './SearchBar';

const styles = (theme) => ({
  fab: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  iconBtn: {
    marginRight: theme.spacing.unit
  }
});


class SearchPage extends Component {
  state = {
    searchInput: 'Chicago',
    showCurrentLocation: false,
    currentLocation: null
  }

  handleLocationSearch = (value) => {
    this.setState({
      searchInput: value,
      showCurrentLocation: false,
      currentLocation: null
    });
  }

  fetchUserCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.setState({
          currentLocation: {
            lat: latitude,
            lon: longitude
          },
          showCurrentLocation: true,
        });
      });
    }
  }

  renderSearchInput = () => {
    return (
      <SearchBar
        handleLocationSearch={this.handleLocationSearch}
      />
    );
  }

  renderMyLocationButton = () => {
    const { classes } = this.props;
    return (
      <Fab variant="extended" aria-label="Delete" onClick={this.fetchUserCurrentLocation} className={classes.fab}>
        <PinIcon className={classes.iconBtn} />
        Use My Location
      </Fab>
    );
  }

  render() {
    const { searchInput, showCurrentLocation, currentLocation } = this.state;
    let queryVariables = { address: searchInput };
    let resultString = searchInput;
    if (showCurrentLocation) {
      resultString = 'your location';
      queryVariables = currentLocation;
    }
    return (
      // Variables can be either lat and lon OR address
      <Query
        query={RESTAURANT_SEARCH_QUERY}
        variables={queryVariables}
      >
        {({ loading, error, data = {} }) => {
          if (loading) {
            return <CircularProgress />;
          }

          console.log('DO SOMETHING SMART WITH THIS DATA');
          console.log('data', data);
          console.log('error', error);
          let restaurants = [];
          // Make sure we have data
          if (
            data.search_restaurants
            && data.search_restaurants.results
            && data.search_restaurants.results.length > 0
          ) {
            restaurants = data.search_restaurants.results;
          }
          return (
            <Grid container>
              <Grid item md={4} sm={12}>
                <RestListView
                  renderMyLocationButton={this.renderMyLocationButton}
                  renderSearchInput={this.renderSearchInput}
                  restaurants={restaurants}
                  resultString={`Showing results for ${resultString}`}
                />
              </Grid>
              <Hidden smDown>
                <Grid item md={8}>
                  <RestMapView
                    currentLocation={currentLocation}
                    renderMyLocationButton={this.renderMyLocationButton}
                    renderSearchInput={this.renderSearchInput}
                    restaurants={restaurants}
                  />
                </Grid>
              </Hidden>
            </Grid>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(SearchPage);
