import React, { Component } from 'react';
import { Segment, Header, Card, Image } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import { connect } from 'react-redux';
import { fetchBeers } from '../actions/beers';
import beer_icons from '../images/beer_icons.jpg';
import SearchBeer from './SearchBeer'
import axios from 'axios';


class Beers extends Component {
  state = { page: 1, hasMore: true }
  
  componentDidMount() {
    this.props.dispatch(fetchBeers());
  }

  displayBeers = () => {
    return this.props.beers.map( beer => {
      return(
        <Card key={beer.id}>
            {beer.labels ?
            <Image
              centered
              size='small'
              src={beer.labels.medium}
              alt={`${beer.name} logo`}
            />
            :
            <Image
              centered
              src={beer_icons}
              size='medium'
              alt='Beer placeholder image'
            /> 
              }
            <Card.Content>
              <Card.Header>
                Beer: {beer.name}
              </Card.Header>
              <Card.Description>
                Description: {beer.description}
              </Card.Description>
            </Card.Content>
          </Card>
      );
    })
  }

  loadFunc = () => {
    axios.get(`/api/all_beers?page=${this.state.page + 1}&per_page=10`)
      .then( res => {
        this.props.dispatch({ type: 'MORE_BEERS', beers: res.data.entries });
        this.setState({ page: this.state.page + 1, hasMore: res.data.has_more })
      })
      .catch( err => {
    });
  }
  

  render() {
    return(
      <Segment basic >
        <SearchBeer />
        <Header as='h1' textAlign='center' color='green'>Beers</Header>
        <Segment basic style={{ height: '700px', overflow: 'auto' }}>
          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadFunc}
            hasMore={true || false}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
            >
          <Card.Group stackable itemsPerRow={5}>
            { this.displayBeers() }
          </Card.Group>
          </InfiniteScroll>
        </Segment>
      </Segment>
    );
  }
  };

const mapStateToProps = (state) => {
  return { 
    beers: state.beers,
  }
}

export default connect(mapStateToProps)(Beers);