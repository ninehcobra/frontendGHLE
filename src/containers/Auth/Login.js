import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            isShowPassword: false,
            errMessage: '',
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState(
            {
                username: event.target.value
            }
        )
    }

    handleOnChangePassword = (event) => {
        this.setState(
            {
                password: event.target.value
            }
        )

    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        })
        try {
            let data = await handleLoginApi(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })
            }
            if (data && data.errCode === 0) {
                this.props.userLoginSuccess(data.user)
                console.log("log in success")
            }

        } catch (error) {
            console.log(error)
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message
                    })
                }
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    render() {
        return (
            <div className='login-background'>
                <script src="https://kit.fontawesome.com/03244eb91d.js" crossorigin="anonymous"></script>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 login-text'>LOGIN</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input placeholder='Enter your username'
                                type='text'
                                className='form-control'
                                value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)}></input>
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input className='form-control' placeholder='Enter your password' type={this.state.isShowPassword ? 'text' : 'password'}
                                    value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)}></input>
                                <span onClick={() => { this.handleShowHidePassword() }}>
                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                </span>

                            </div>
                        </div>

                        <div className='col-12' style={{ color: 'red' }}> {this.state.errMessage}</div>
                        <div className='col-12 '>
                            <button className='login-btn' onClick={() => { this.handleLogin() }}>LOGIN</button>
                        </div>
                        <div className='col-12'>
                            <span className='login-forgotpass'>Forgot your password?</span>
                        </div>
                        <div className='col-12 text-center mt-3'>
                            <span className='login-forgotpass'>Or login with:</span>
                        </div>
                        <div className='col-12 social-login'>
                            <i className='fab fa-google-plus-g google'></i>
                            <i className='fab fa-facebook-f facebook'></i>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),

        // userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
