import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import CreateTodo from "./components/create-todo.component";
import EditTodo from "./components/edit-todo.component";
import TodosList from "./components/todos-list.component";


class App extends Component {
    render() {
        return (
            <Router>
                <div className="container">

                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <img src={"http://cdn.shopify.com/s/files/1/0603/7977/products/TheMountainsAreCalling_12Inch_BlackGraphic_600x.png?v=1551312101"} width="500" height="400" alt="" />
                        <Link to="/" className="navbar-brand">Hike It BB!</Link>
                        <div className="collpase nav-collapse">
                            <ul className="navbar-nav mr-auto">
                                <li className="navbar-item">
                                    <Link to="/" className="nav-link">List of Hikes</Link>
                                </li>
                                <li className="navbar-item">
                                    <Link to="/create" className="nav-link">Add Hike</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    <Route path="/" exact component={TodosList} />
                    <Route path="/edit/:id" component={EditTodo} />
                    <Route path="/create" component={CreateTodo} />
                </div>
            </Router>
        );
    }
}

export default App;

