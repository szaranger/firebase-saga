import { combineReducers } from 'redux';
import * as constants from '../actions';

const posts = (state = { posts: [] }, action) => {

    switch (action.type) {
        case constants.FETCH_POST:
            return {
                id: action.id
            };
        case constants.POSTS_RECEIVED:
            const posts = action.posts;
            return {
                ...state,
                posts: Object.keys(posts).map(
                    (key) => Object.assign({}, {id: key}, posts[key])
                ),
                isSinglePost: false,
                isSyncing: false
            };
        case constants.SYNC_POST_ADDED:
            const post = {...action.post, id: action.post.key};
            const syncdPosts = state.isSyncing ? state.posts.concat(post) : [post];

            return {
                posts: syncdPosts,
                isSinglePost: false,
                isSyncing: true
            };
        case constants.SYNC_POST_REMOVED:
            return {
                posts: state.posts.pop({...action.post, id: action.post.key}),
                ...state
            };
        case constants.POST_RECEIVED:
            return {
                ...state,
                posts: [Object.assign({}, action.post, { isSingle: true })]
            };
        case constants.CREATE_POST:
            return {
                ...state,
                formData: action.formData
            };
        case constants.POST_CREATED:
            return {
                ...state
            };
        case constants.POST_CREATION_FAILED:
            return {
                ...state,
                error: action.error
            };
        case constants.DELETE_POST:
            return {
                ...state,
                id: action.id
            };
        case constants.POST_DELETED:
            return {
                ...state
            };
        case constants.POST_DELETION_FAILED:
            return {
                ...state,
                error: action.error
            };
        case constants.EDIT_POST:
            return {
                ...state,
                posts: [Object.assign({}, state.posts, { isEditing: true })]
            };
        case constants.UPDATE_POST:
            return {
                ...state,
                formData: action.formData
            };
        case constants.POST_UPDATED:
            return {
                ...state
            };
        case constants.POST_UPDATING_FAILED:
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

export const getId = (state) => {
    return state.posts.id;
}

export default combineReducers(
    { posts }
);
