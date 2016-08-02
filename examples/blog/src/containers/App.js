import React from 'react'
import { Link } from 'react-router'

const App = ({ children }) => {
    return (
        <div>
            <nav className="navbar navbar-default">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="#">Blog</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li className="active"><Link to="/">Home</Link></li>
                        <li><Link to="/new">New</Link></li>
                    </ul>
                </div>
            </nav>
            <section className="container">
                { children }
            </section>
        </div>
    )
};

export default App;
