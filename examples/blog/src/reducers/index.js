import { combineReducers } from 'redux';
import { POSTS_RECEIVED } from '../actions';

const posts = (state = {}, action) => {

  switch (action.type) {
    case POSTS_RECEIVED:
      return { ...state, [payload.data.key]: payload.data.val() };
    default:
      return state;
  }
}

export default combineReducers(
  { posts }
);