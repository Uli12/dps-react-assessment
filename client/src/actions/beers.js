import axios from 'axios';
import { setFlash } from './flash';

// action creator
const setBeers = (beers) => {
  return { type: 'SET_BEERS', beers: beers }
}

export const fetchBeers = () => {
  return dispatch => {
    axios.get(`/api/all_beers?page=1&per_page=10`)
      .then( res => {
        dispatch(setBeers(res.data.entries))
      })
      .catch( err => {
        dispatch(setFlash('Error fetching beers. Try again!', 'red'));
    });
  }
}