import React from "react"
import { directive } from "@babel/types";

class Blog extends React.Component {
    constructor() {
        super()
        this.state = {
            display: true
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState(prevState => {
            return {
                display: !prevState.display
            }
        })
    }
    render() {
        if (this.state.display === true) {
            return (
                <div>
                    <button onClick={this.handleClick}>Toggle blog</button>
                    <h1>Blog</h1>
                </div>
            )
        }
        else {
            return (
                <div>
                    <button onClick={this.handleClick}>Toggle blog</button>
                    <h1></h1>
                </div>
            )
        }
    }
}
export default Blog