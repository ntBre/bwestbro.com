import React from "react"
import NavBar from "./NavBar"

class App extends React.Component {
    render() {
        return (
            <div>
                <NavBar />
            </div>
        )

    }
}
/*
            <Router>
                <div>
                    <h1>bwestbro.com</h1>
                    <ul className="header">
                        <li><NavLink to="/">Home</NavLink></li>
                        <li><NavLink to="/blog">Blog</NavLink></li>
                        <li><NavLink to="/publications">Publications</NavLink></li>
                        <li><NavLink to="/about">About</NavLink></li>
                    </ul>
                    <div className="content">
                        <Route exact path="/" component={Home} />
                        <Route path="/blog" component={Blog} />
                        <Route path="/publications" component={Pubs} />
                        <Route path="/about" component={About} />
                    </div>
                </div>
            </Router>
<Blog />
    <Pubs />
    <About />
    <SP18 />
    <FA18 />
    <SP19 />
    */
export default App
