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
            <div>
                <h2>Blog Posts</h2>
                <ul className="blog list-group">
                    {content}
                </ul>
                <button onClick={() => browserHistory.push('/new')} className="btn btn-primary">Create new post</button>
            </div>

        )
    }
}

export default connect(
    state => ({ posts: state.posts }),
    dispatch => bindActionCreators(actions, dispatch)
)(Blog)
