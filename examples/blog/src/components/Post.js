import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';

const Post = ({ post, deletePost }) => {
    return (
        <li className="list-group-item">
            <h3>{ post.title }</h3>
            <p>{ post.date }</p>
            <section className="body">{ post.body }</section>
            <button className="btn btn-danger" onClick={ ()=> deletePost(post.id) }>Delete</button>
        </li>
    );
};

export default connect(
    state => ({ posts: state.posts }),
    dispatch => bindActionCreators(actions, dispatch)
)(Post)
