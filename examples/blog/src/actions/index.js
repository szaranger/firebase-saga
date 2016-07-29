export const FETCH_POSTS = 'FETCH_POSTS';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const FETCH_POSTS_FAILED = 'FETCH_POSTS_FAILED';

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
