import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import img from '../../../src/assets/login.png'
import logo from '../../../src/assets/logo-giaohangle.png'

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

    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // Xử lý logic khi nhấn phím Enter ở đây
            this.handleLogin()
        }
    };

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
            <div className='login-container'>
                <div className='row'>
                    <div className='left-content'>
                        <div className='background-left'>
                            <img src={img} className='img'></img>
                            <div className='logo-school'>
                                <img src='https://tse4.mm.bing.net/th?id=OIP.RopD45u-y2SjLUw0x5loNAHaI2&pid=Api&P=0&h=180'></img>
                            </div>
                            <div className='content-note'>
                                <img src={logo}></img>
                                <div className='left-row2'>
                                    THIẾT KẾ CHO GIẢI PHÁP GIAO NHẬN HÀNG
                                    <br />
                                    TỐT NHẤT TỪ TRƯỚC ĐẾN NAY
                                </div>
                                <div className='left-row3'>Nhanh hơn, rẻ hơn và thông minh hơn</div>
                            </div>
                            <div className='backdrop'></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='form-content'>
                            <div className='login-content'>
                                <div className='title-login'>
                                    <span className='login-row-1'>Đăng nhập</span>
                                    <p className='login-row-2'>Chào ngày mới! Cùng chốt nhiều đơn hôm nay nhé!</p>
                                </div>
                                <div className='login-form'>
                                    <div className='row'>
                                        <div className='col-3'></div>
                                        <div className='col-6'>
                                            <div className='form-group'>
                                                <label >Tài khoản</label>
                                                <input placeholder='Vui lòng nhập email của bạn' type='text' value={this.state.username} onChange={(event) => this.handleOnChangeUsername(event)} className='form-control'></input>
                                                <p ></p>
                                            </div>
                                            <div className='form-group'>
                                                <label >Mật khẩu</label>
                                                <a href='/forgot' >Quên mật khẩu?</a>
                                                <input placeholder='Vui lòng nhập mật khẩu' type={this.state.isShowPassword ? 'text' : 'password'}
                                                    value={this.state.password} onChange={(event) => this.handleOnChangePassword(event)} className='form-control'></input>
                                                <span onClick={() => { this.handleShowHidePassword() }}>
                                                    <i className={this.state.isShowPassword ? 'far fa-eye' : 'far fa-eye-slash'}></i>
                                                </span>
                                                <p >{this.state.errMessage}</p>
                                            </div>
                                            <p></p>
                                            <button onClick={() => { this.handleLogin() }} className='login-button'>Đăng nhập</button>
                                            <div className='login-row-3'>
                                                <label className="">{'Bạn chưa có tài khoản '}</label>
                                                <a href='/register'> <span>Đăng ký ngay</span></a>
                                            </div>
                                            <div className='note'>
                                                Nhân sự của GHLE hiện tại chưa có trang đăng nhập riêng. Đăng nhập hệ thống ngay tại đây.
                                            </div>
                                        </div>
                                        <div className='col-3'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <a href='/home'>   <div className='button-home'>Về trang chủ</div></a>




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
