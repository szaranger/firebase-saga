import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { v1 } from 'node-uuid';
import * as actions from '../actions';

class New extends React.Component {

    onSubmit() {
        this.props.createPost({
            id: v1(),
            title: this.refs.title,
            body: this.refs.body,
            timestamp: +new Date
        });
    }
    render() {
        return (
            <form>
                <label>Title</label><br/>
                <input type="text" ref="title" /><br/>
                <label>Body</label><br/>
                <textarea rows="5" ref="body" /><br />
                <button onClick={() => this.onSubmit() } className="btn btn-primary">Get first post</button>
            </form>
        );
    }
}

export default connect(
    state => ({ posts: state.posts }),
    dispatch => bindActionCreators(actions, dispatch)
)(New)
