import axios from 'axios';
import { setFlash } from './flash';

// action creator
const setBeers = (beers) => {
  // action that is being dispatched
  // key of type
  // key of beers
  return { type: 'SET_BEER', beers: beers }
}

export const fetchBeers = () => {
  // thunk
  return dispatch => {
    axios.get(`/api/all_beers`)
      .then( res => {
        dispatch(setBeers(res.data.beers));
      })
      .catch( err => {
        dispatch(setFlash('Error fetching beers. Try again!', 'red'));
    });
  }
}