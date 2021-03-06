export const eventsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_EVENTS':
      return [...state, ...action.events];
    case 'UPDATE_EVENTS':
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

