import React, { Component } from 'react'

export default class Login extends Component {
    render() {
        return (
            <div>
                <form method='post' action='/users/login'>
                    <div>
                        <input placeholder='username' name='username'/>
                    </div>
                    <div>
                        <input placeholder='password' name='password'/>
                    </div>
                    <button type='submit'>Signin</button>
                </form>
            </div>
        )
    }
}