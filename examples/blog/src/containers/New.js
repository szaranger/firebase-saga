import React from 'react';

class New extends React.Component {

    render() {
        return (
            <form>
                <label>Title</label><br/>
                <input type="text" ref="title" /><br/>
                <label>Body</label><br/>
                <textarea rows="5" ref="body" />
            </form>
        );
    }
}

export default New;
