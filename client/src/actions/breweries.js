import axios from 'axios';
import { setFlash } from './flash';

const setBreweries = (breweries) => {
  return { type: 'SET_BREWERIES', breweries: breweries }
}

export const fetchBreweries = () => {
  return dispatch => {
    axios.get(`/api/all_breweries?page=1&per_page=10`)
      .then( res => {
        console.log(res)
        dispatch(setBreweries(res.data.entries))
      })
      .catch( err => {
        dispatch(setFlash('Error fetching breweries. Try again!', 'red'));
    });
  }
}
