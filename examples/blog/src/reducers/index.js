import { combineReducers } from 'redux';
import { POSTS_RECEIVED, POST_RECEIVED } from '../actions';

const posts = (state = {posts: []}, action) => {

    switch (action.type) {
        case POSTS_RECEIVED:
            return {
                ...state,
                posts: action.posts
            };
        case POST_RECEIVED:
            return {
                ...state,
                posts: [action.post]
            };
        default:
            return state;
    }
}

export default combineReducers(
    { posts }
);
