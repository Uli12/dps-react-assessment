import React, { Component } from 'react';
import { Segment, Header, Card, Image } from 'semantic-ui-react';
import InfiniteScroll from 'react-infinite-scroller';
import beer_icons from '../images/beer_icons.jpg';
import axios from 'axios';

class Breweries extends Component {
  state = { breweries: []}  

  componentDidMount() {
    axios.get(`/api/all_breweries?page=1&per_page=10`)
      .then( res => {
        console.log(res)
        // let { name, description } = res.data;
        this.setState({ breweries: res.data.entries });
        // this.props.dispatch(fetchBeers());
      })
      .catch(err =>
        console.log('Error fetching and parsing data'));
  }

  
  displayBreweries = () => {
    // ternary whether or not brewery.images.square_medium is blank
    return this.state.breweries.map( brewery => {
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

render() {
  return(
    <Segment basic >
     
      <Header as='h1' textAlign='center' color='green'>Breweries</Header>
      <Card.Group stackable textAlign='center' itemsPerRow={5}>
        { this.displayBreweries() }
      </Card.Group>
    </Segment>
  );
}
};

export default Breweries;