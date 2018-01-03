import React, { Component } from 'react';
import { Segment, Header, Card, Image } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { fetchBreweries } from '../actions/breweries';
import beer_icons from '../images/beer_icons.jpg';
import axios from 'axios';

class Breweries extends Component {
  state = { page: 1, hasMore: true }

  componentDidMount() {
    this.props.dispatch(fetchBreweries());
  }

  displayBreweries = () => {
    // ternary whether or not brewery.images.square_medium is blank
    return this.props.breweries.map( brewery => {
      return(
        <Card>
            {brewery.images ?
              <Image
                centered
                size='medium'
                src={brewery.images.square_medium}
                alt={`${brewery.name} logo`}
              />
              :
              <Image
                centered
                size='medium'
                src={beer_icons}
                alt='Brewery placeholder image'
              /> }
            <Card.Content>
              <Card.Header>
                Brewery: {brewery.name}
              </Card.Header>
              <Card.Description>
                Description: {brewery.description}
              </Card.Description>
            </Card.Content>
          </Card>
      );
    })
  }

  loadFunc = () => {
    axios.get(`/api/all_breweries?page=${this.state.page + 1}&per_page=10`)
      .then( res => {
        this.props.dispatch({ type: 'MORE_BREWERIES', breweries: res.data.entries });
        this.setState({ page: this.state.page + 1, hasMore: res.data.has_more })
      })
      .catch( err => {
    });
  }

render() {
  return(
    <Segment basic >
      <Header as='h1' textAlign='center' color='green'>Breweries</Header>
      <Segment basic style={{ height: '700px', overflow: 'auto' }}>
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        hasMore={true || false}
        loader={<div className="loader">Loading ...</div>}
        useWindow={false}
      >
      <Card.Group stackable itemsPerRow={5}>
        { this.displayBreweries() }
      </Card.Group>
      </InfiniteScroll>
      </Segment>
    </Segment>
  );
}
};

const mapStateToProps = (state) => {
  return { 
    breweries: state.breweries,
  }
}

export default connect(mapStateToProps)(Breweries);