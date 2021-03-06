export const cultureReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_CULTURE':
      return [...state, ...action.events];
    case 'UPDATE_CULTURE':
      return state.map(event => { 
        if (event.id === action.event.id) {
          return action.event;
        } 
        
        return event;
      })
    default:
      return state;
  }
};