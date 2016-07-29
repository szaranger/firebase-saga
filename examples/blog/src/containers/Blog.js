import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Post from '../components/Post';
import * as actions from '../actions';

class Blog extends React.Component {
    componentDidMount() {
        this.props.loadPosts();
    }

    render() {
        const { posts } = this.props;

        const content = posts ? (
          posts.map((post) => {
              <article key={post.id}>
                  <h4>{post.title}</h4>
                  <section>{post.body}</section>
              </article>
          })
        ) : null;

        return (
          <div className="blog">
              {content}
          </div>
        )
    }
}

export default connect(
  state => ({images: state.images, selectedImage: state.selectedImage}),
  dispatch => bindActionCreators(actions, dispatch)
)(Blog)