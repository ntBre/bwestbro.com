import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'

class Nav extends React.Component {
    render() {
        return (
            <nav className="Nav">
                <div className="Nav__container">
                    <Link to="/" className="Nav__brand">Brent Westbrook</Link>

                    <div className="Nav__right">
                        <ul className="Nav__item-wrapper">
                            <li className="Nav__item">
                                <Link className="Nav__link" to="/">Home</Link>
                            </li>
                            <li className="Nav__item">
                                <Link className="Nav__link" to="#blog">Blog</Link>
                            </li>
                            <li className="Nav__item">
                                <Link className="Nav__link" to="/#pubs">Publications</Link>
                            </li>
                            <li className="Nav__item">
                                <Link className="Nav__link" to="/#about">About</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Nav