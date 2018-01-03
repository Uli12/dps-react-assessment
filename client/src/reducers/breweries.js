const breweries = (state = [], action) => {
  // action { type: 'SET_BREWERIES',  beer: [{}, {}, {}] }
  switch(action.type) {
    case 'SET_BREWERIES':
      return action.breweriess
    case 'MORE_BREWERIES':
      return [...state, ...action.breweries]
    default:
      return state;
  }
}

export default breweries;
