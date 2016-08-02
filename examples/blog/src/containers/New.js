import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { v1 } from 'node-uuid';
import * as actions from '../actions';

class New extends React.Component {

    onSubmit({ title, body }) {
        this.props.createPost({
            id: v1(),
            title: title.value,
            body: body.value,
            timestamp: +new Date
        });

        browserHistory.push('/');
    }

    render() {
        return (
            <form>
                <label>Title</label><br/>
                <input type="text" ref="title" /><br/>
                <label>Body</label><br/>
                <textarea rows="5" ref="body" /><br />
                <button onClick={ () => this.onSubmit(this.refs) } className="btn btn-primary">Submit</button>
            </form>
        );
    }
}

export default connect(
    state => ({ posts: state.posts }),
    dispatch => bindActionCreators(actions, dispatch)
)(New)
