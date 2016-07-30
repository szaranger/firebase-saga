export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POST_RECEIVED = 'POST_RECEIVED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';
export const FETCH_POST_FAILED = 'FETCH_POST_FAILED';

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
