export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POST_RECEIVED = 'POST_RECEIVED';
export const POST_CREATED = 'POST_RECEIVED';
export const POST_DELETED = 'POST_DELETED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';
export const POST_CREATION_FAILED = 'POST_CREATION_FAILED';
export const POST_DELETION_FAILED = 'POST_DELETION_FAILED';

export function fetchPosts() {
  return {
    type: FETCH_POSTS
  };
}

export function postsReceived(posts) {
  return {
    type: POSTS_RECEIVED,
    posts
  };
}

export function fetchPostsFailed(error) {
    return {
        type: FETCH_POSTS_FAILED,
        error
    };
}

export function fetchPost(id) {
    return {
        type: FETCH_POST,
        id
    };
}

export function postReceived(post) {
    return {
        type: POST_RECEIVED,
        post
    };
}

export function fetchPostFailed(error) {
    return {
        type: FETCH_POST_FAILED,
        error
    };
}

export function createPost(formData) {
    return {
        type: CREATE_POST,
        formData
    };
}

export function postCreated() {
    return {
        type: POST_CREATED
    };
}

export function postCreationFailed(error) {
    return {
        type: POST_CREATION_FAILED,
        error
    };
}

export function deletePost(id) {
    return {
        type: DELETE_POST,
        id
    };
}

export function postDeleted() {
    return {
        type: POST_DELETED
    };
}

export function postDeletionFailed(error) {
    return {
        type: POST_DELETION_FAILED,
        error
    };
}

