import { combineReducers } from 'redux';
import { POSTS_RECEIVED, POST_RECEIVED, CREATE_POST, POST_CREATED, POST_CREATION_FAILED } from '../actions';

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
            return {
                ...state,
                posts: [action.post]
            };
        case POST_CREATED:
            return {
                ...state
            };
        case CREATE_POST:
            return {
                ...state,
                formData: action.formData
            };
        case POST_CREATION_FAILED:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
};

export const getFormData = (state) => {
    return state.posts.formData;
}

export default combineReducers(
    { posts }
);
