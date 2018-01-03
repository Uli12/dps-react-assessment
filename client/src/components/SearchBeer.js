import React, { Component } from 'react';
import _ from 'lodash'
import { Grid, Search, Card } from 'semantic-ui-react';
import { fetchBeers } from '../actions/beers';
import { connect } from 'react-redux';
import axios from 'axios';

const source = () => {
  axios.put(`/api/all_beers?page=1&per_page=10`)
.then( res => {
  this.props.dispatch({ type: 'SET_BEERS', beers: res.data.entries })
})
.catch( err => {
  // TODO: set error flash message
})
}

class SearchBeer extends Component {
  componentWillMount() {
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, results: [], value: '' })

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      
      
      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 500)
  }

  render() {
    const { isLoading, value, results } = this.state

    return (
      <Grid>
        <Grid.Column width={8}>
          <Search
            loading={isLoading}
            onResultSelect={this.handleResultSelect}
            onSearchChange={this.handleSearchChange}
            results={results}
            value={value}
            {...this.props}
          />
        </Grid.Column>
        <Card.Group stackable itemsPerRow={5}>
          {results}
        </Card.Group>
      </Grid>
    );}
}
const mapStateToProps = (state) => {
  return { 
    beers: state.beers,
  }
}
export default connect(mapStateToProps)(SearchBeer);