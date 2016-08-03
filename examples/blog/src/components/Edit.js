import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router'
import { v1 } from 'node-uuid';
import * as actions from '../actions';

class Edit extends React.Component {

    onSubmit(id, { title, body }) {
        this.props.updatePost({
            id: id,
            title: title.value,
            body: body.value,
            timestamp: +new Date
        });

        //browserHistory.push('/');
    }

    render() {
        const { id, title, body } = this.props.post;

        return (
            <form className="list-group-item">
                <label>Title</label><br/>
                <input type="text" ref="title" defaultValue={title} /><br/>
                <label>Body</label><br/>
                <textarea rows="5" ref="body" defaultValue={body} /><br />
                <button className="btn btn-default" onClick={ () => browserHistory.push('/') }>Cancel</button>
                <button onClick={ () => this.onSubmit(id, this.refs) } className="btn btn-primary">Update</button>
            </form>
        );
    }
}

export default connect(
    state => ({ posts: state.posts }),
    dispatch => bindActionCreators(actions, dispatch)
)(Edit)
