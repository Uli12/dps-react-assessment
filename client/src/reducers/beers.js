const beers = (state = [], action) => {
  // action { type: 'SET_BEERS',  beer: [{}, {}, {}] }
  switch(action.type) {
    case 'SET_BEERS':
      return action.beers
    case 'MORE_BEERS':
      return [...state, ...action.beers]
    default:
      return state;
  }
}

export default beers;