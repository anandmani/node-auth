import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'
import Signup from './Signup'
import Dashboard from './Dashboard'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

class Test extends Component {
    render() {
        return (
            <div>
                <Router>
                    <div>
                        <ul>
                            <li><Link to="/">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </ul>

                        <hr />

                        <Route exact path="/" component={Login} />
                        <Route path="/signup" component={Signup} />
                        <Route path="/dashboard" component={Dashboard} />
                    </div>
                </Router>
            </div>
        )
    }
}

ReactDOM.render(<Test />, document.getElementById('container'))