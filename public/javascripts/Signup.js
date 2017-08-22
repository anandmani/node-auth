import React, { Component } from 'react'

export default class Signup extends Component {
    componentDidMount() {
        if (this.props.location.search.indexOf('errors') > -1) {
            alert('form has erros')
        }
    }
    render() {
        return (
            <div>
                <form method='post' action='/users/register' encType='multipart/form-data'>
                    <div>
                        <input placeholder='name' name='name' />
                    </div>
                    <div>
                        <input placeholder='email' name='email' />
                    </div>
                    <div>
                        <input placeholder='usernam' name='username' />
                    </div>
                    <div>
                        <input placeholder='password' name='password' />
                    </div>
                    <div>
                        <input type="file" placeholder='image' name='image' />
                    </div>
                    <button type='submit'>Signup</button>
                </form>
            </div>
        )
    }
}