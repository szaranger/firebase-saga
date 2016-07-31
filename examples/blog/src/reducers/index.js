import { combineReducers } from 'redux';
import { POSTS_RECEIVED, POST_RECEIVED, CREATE_POST, POST_CREATED } from '../actions';

const posts = (state = {posts: []}, action) => {

    switch (action.type) {
        case POSTS_RECEIVED:
            const posts = action.posts;
            return {
                ...state,
                posts: Object.keys(posts).map(
                    (key) => posts[key]
                )
            };
        case POST_RECEIVED:
        case POST_CREATED:
            return {
                ...state,
                posts: [action.post]
            };
        case CREATE_POST:
            return {
                ...state,
                formData: action.formData
            };
        default:
            return state;
    }
};

export const getFormData = (state) => state.formData;

export default combineReducers(
    { posts }
);
