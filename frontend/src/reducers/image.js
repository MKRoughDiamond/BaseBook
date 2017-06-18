import { GET_IMAGE_URL, TOFEED, TOCHAT, LOGOUT, TOPROFILE, TOMULTICHAT, TOTIMELINE, TOHASHFEED, TOMAIN, TOSIGNUP,/* DELETE_IMAGE*/ } from '../actions';

const initialState = {
  name: null,
  url: null
};

const image = (state = initialState, action) => {
  switch(action.type) {
  case TOFEED:
    return initialState;
  case LOGOUT:
    return initialState;
  case TOCHAT:
    return initialState;
  case TOPROFILE:
    return initialState;
  case TOMULTICHAT:
    return initialState;
  case TOTIMELINE:
    return initialState;
  case TOHASHFEED:
    return initialState;
  case TOMAIN:
    return initialState;
  case TOSIGNUP:
    return initialState;
  case GET_IMAGE_URL:
    return Object.assign({}, state, {
      name: action.name, 
      url: action.url
    });
  /*case DELETE_IMAGE:
    return initialState;*/
  default:
    return state;
  }
};

export default image;
