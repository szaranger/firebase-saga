import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import Post from '../components/Post';
import * as actions from '../actions';

class Blog extends React.Component {

    componentDidMount() {
        this.props.fetchPosts();
    }

    render() {
        const { posts } = this.props.posts;

        const content = posts ? (
            posts.map((post) => {
                return (
                    <Post key={post.timestamp} post={ post }/>
                )
            })
        ) : (
            <p>Loading posts..</p>
        );

        return (
            <div className="blog">
                {content}
                <button onClick={() => this.props.fetchPost(1) } className="btn btn-default">Get first post</button>
                <button onClick={() => browserHistory.push('/new')} className="btn btn-primary">Create new post</button>
            </div>
        )
    }
}

export default connect(
    state => ({ posts: state.posts }),
    dispatch => bindActionCreators(actions, dispatch)
)(Blog)
