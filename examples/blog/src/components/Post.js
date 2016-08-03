import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Edit from './Edit';
import * as actions from '../actions';

const Post = ({ post, fetchPost, editPost, deletePost }) => {

    const actionButton = post.isSingle ? (
        <button onClick={() => editPost(post.id) } className="btn btn-success">Edit</button>
    ) :(
        <button onClick={() => fetchPost(post.id) } className="btn btn-default">Read more</button>
    );

    const content = post.isEditing ? (
        <Edit post={ post[0] } />
    ) : (
        <li className="list-group-item">
            <h3>{ post.title }</h3>
            <p>{ post.date }</p>
            <section className="body">{ post.body }</section>
            { actionButton }
            <button className="btn btn-danger" onClick={ ()=> deletePost(post.id) }>Delete</button>
        </li>
    );

    return content;
};

export default connect(
    undefined,
    dispatch => bindActionCreators(actions, dispatch)
)(Post)
