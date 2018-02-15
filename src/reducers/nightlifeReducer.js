export const eventsReducer = (state = [], action) => {
  switch(action.type) {
    case 'ADD_NIGHTLIFE':
      return [...state, ...action.events];
    default:
      return state;
  }
};