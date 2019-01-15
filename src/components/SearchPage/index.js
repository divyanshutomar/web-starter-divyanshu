import React, { Component } from 'react';
import { Query } from 'react-apollo';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { RESTAURANT_SEARCH_QUERY } from '../../graphql/queries';
import RestListView from './RestListView';
import RestMapView from './RestMapView';
import SearchBar from './SearchBar';


class SearchPage extends Component {
  state = {
    searchInput: 'Chicago'
  }

  handleLocationSearch = (value) => {
    this.setState({
      searchInput: value
    });
  }

  renderSearchInput = () => {
    return (
      <SearchBar
        handleLocationSearch={this.handleLocationSearch}
      />
    );
  }

  render() {
    const { searchInput } = this.state;
    const queryVariables = { address: searchInput };
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
                  renderSearchInput={this.renderSearchInput}
                  restaurants={restaurants}
                />
              </Grid>
              <Hidden smDown>
                <Grid item md={8}>
                  <RestMapView
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

export default SearchPage;
