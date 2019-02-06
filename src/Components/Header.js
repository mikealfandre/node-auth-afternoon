import React, { Component } from 'react'
import './Header.css'
import axios from 'axios'

export default class Header extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            isAdmin: false,
        }
        this.login = this.login.bind(this)
        this.register = this.register.bind(this)
        this.logout = this.logout.bind(this)
    }
    handleUsernameInput(value){
        // should update this.state.username  based on user input. Do not mutate state, use setState.
        this.setState({
            username: value
        })
    }
    handlePasswordInput(value){
        // should update this.state.password based on user input. Do not mutate state, use setState.
        this.setState({
            password: value
        })
    }

    toggleAdmin () {
        // should toggle the value of isAdmin on state, by setting it to the value of it's opposite. (!this.state.isAdmin)
        this.setState({
            isAdmin: !this.state.admin
        })
    }

    login () {
        // create POST request to login endpoint
        const {username, password, isAdmin} = this.state
        axios.post('/auth/login', {username, password})
            .then(() => {
                this.setState({
                    username: '',
                    password:''
                })
                this.props.updateUser({username, isAdmin})
            })
    }

    register () {
        // create POST request to register new user
        const {username, password, isAdmin} = this.state
        axios.post('/auth/register', {username, password, isAdmin})
            .then(() => {
                this.setState({
                    username: '',
                    password: ''
                })
                this.props.updateUser({username, isAdmin})
            })
    }

    logout () {
        // GET request to logout
        axios.get('/auth/logout')
            .then(() => {
                this.props.updateUser({})
            })
    }

    render() {
        const { username, password } = this.state
        const { user } = this.props
        return (
            <div className='Header'>
                <div className="title">Dragon's Lair</div>
                {
                    user.username ?
                    (<div className='welcomeMessage'>
                            <h4>{user.username}, welcome to the dragon's lair</h4>
                            <button type="submit" onClick={this.logout}>Logout</button>
                        </div>
                        )
                        :
                        <div className="loginContainer">

                            <input onChange={(e) => this.handleUsernameInput(e.target.value)}
                                type="text"
                                placeholder="Username"
                                value={username}
                                
                            />
                            <input onChange={(e) => this.handlePasswordInput(e.target.value)}
                                type="password"
                                placeholder="Password"
                                value={password}
                                
                            />
                            <div className='adminCheck' >
                                <input onChange={() => this.toggleAdmin()} type="checkbox" id='adminCheckbox'  /> <span> Admin </span>
                            </div>
                            <button onClick={this.login}>Log In</button>
                            <button onClick={this.register} id='reg' >Register</button>

                        </div>}
            </div>
        )
    }
}
