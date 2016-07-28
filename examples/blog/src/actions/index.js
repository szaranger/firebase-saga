export const FETCH_POSTS = 'FETCH_POSTS';
export const POSTS_RECEIVED = 'POSTS_RECEIVED';
export const POSTS_RECEIVED_FAILED = 'POSTS_RECEIVED_FAILED';

export function fetchPosts() {
  return {
    type: RECEIVE_POSTS
  };
}