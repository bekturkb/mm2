import React, {Component} from "react";
import Posts from "../../sections/posts";
import './home.css';

export default class Home extends Component{
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <div style={{background: '#fafafa'}}>
                <Posts/>
            </div>
        )
    }
}