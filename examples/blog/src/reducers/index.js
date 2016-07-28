import { combineReducers } from 'redux';
import { POSTS_RECEIVED } from '../actions';

const posts = (state = initial.posts, action) => {

  switch (type) {
    case POST_RECEIVED:
      return { ...state, [payload.data.key]: payload.data.val() };
    case SYNC_REMOVED_POST:
      const newState = { ...state };
      delete newState[payload.data.key];
      return newState;
  }
  return state;
}

export default combineReducers(
  { posts }
);