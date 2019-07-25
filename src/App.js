import React from "react"
import NavBar from "./NavBar"
import Blog from "./Blog"
import Pubs from "./Pubs"
import About from "./About"
import SP18 from "./SP18"
import FA18 from "./FA18"
import SP19 from "./SP19"

class App extends React.Component {
    render() {
        return (
            <div>
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                    integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                    crossorigin="anonymous"
                />
                <NavBar />
                <Blog />
                <Pubs />
                <About />
                <SP18 />
                <FA18 />
                <SP19 />
            </div>
        )

    }
}
export default App