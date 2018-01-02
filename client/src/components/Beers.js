import React, { Component } from 'react';
import { Segment, Header, Card, Image } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import beer_icons from '../images/beer_icons.jpg';
import SearchBeer from './SearchBeer'
import axios from 'axios';

class Beers extends Component {
  state = { beers: []}  

  componentDidMount() {
    axios.get(`/api/all_beers?page=1&per_page=10`)
      .then( res => {
        // let { name, description } = res.data;
        this.setState({ beers: res.data.entries });
        // this.props.dispatch(fetchBeers());
      })
      .catch(err =>
        console.log('Error fetching and parsing data'));
  }

  
  displayBeers = () => {
    return this.state.beers.map( beer => {
      return(
        <Card>
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
  

render() {
  return(
    <Segment basic >
      <SearchBeer />
      <Header as='h1' textAlign='center' color='green'>Beers</Header>
      <Card.Group stackable textAlign='center' itemsPerRow={5}>
        { this.displayBeers() }
      </Card.Group>
    </Segment>
  );
}
};

export default Beers;