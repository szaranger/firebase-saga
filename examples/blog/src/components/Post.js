import React from 'react';

const Post = ({ post }) => {
    return (
        <article>
            <h4>{ post.title }</h4>
            <p>{ post.date }</p>
            <section>{ post.body }</section>
        </article>
    );
};

export default Post;
