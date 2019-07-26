import React from "react"
import { Link, Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from "./Nav"
import Home from "./Home"
import Blog from "./Blog"
import Pubs from "./Pubs"
import About from "./About"
import SP18 from "./SP18"
import FA18 from "./FA18"
import SP19 from "./SP19"

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div>
                        <Nav />
                        <Switch>
                            <Route exactly component={Home} path="/path0" />
                            <Route exactly component={Blog} path="/path1" />
                            <Route exactly component={Pubs} path="/path2" />
                            <Route exactly component={About} path="/path3" />
                        </Switch>
                    </div>
                </Router>
            </div>
        )

    }
}
/*
<Blog />
    <Pubs />
    <About />
    <SP18 />
    <FA18 />
    <SP19 />
    */
export default App