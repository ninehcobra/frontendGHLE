import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './Account.scss'

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }


    render() {
        const { processLogout, language, userInfo } = this.props;
        return (

            <div class="account-container" >
                <div className='breadcrump'>
                    <div className='breadcrump-content'>Trang chủ - thông tin tài khoản</div>
                </div>
                <div className='row body'>
                    <div className='col-sm-12 col-md-4'>
                        <div className='info-title'>| Thông tin cá nhân - ID 3654247</div>
                        <div className='avatar'>
                            <img src={new Buffer(userInfo.image, 'base64').toString('binary')}></img>
                        </div>
                        <div className='change'>
                            <label className='change-header'>
                                Họ tên
                            </label>

                            <input value={userInfo.lastName + " " + userInfo.firstName} type='text' className='form-control'></input>
                            <label className='change-header'>
                                Email
                            </label>
                            <div className='input-disabled'>
                                <input value={userInfo.email} className='form-control' type='text' disabled></input>
                            </div>

                            <label className='change-header'>
                                Số điện thoại
                            </label>

                            <input value={userInfo.phoneNumber} type='text' className='form-control'></input>
                            <label className='change-header'>
                                Mật khẩu
                            </label>

                            <div className='input-disabled'>
                                <input value={"hardcodehehe"} className='form-control' type='password' disabled></input>
                            </div>
                            <div className='forgot'>Đổi mật khẩu?</div>

                            <button className='btn-update btn'>Cập nhật</button>


                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>

                        <div className='info-title'>| Thông tin địa chỉ</div>


                        <div className='change' style={{ marginTop: '86px' }}>
                            <label className='change-header'>
                                Địa chỉ
                            </label>

                            <input value={userInfo.address} type='text' className='form-control'></input>


                            <label className='change-header'>
                                Tỉnh
                            </label>

                            <select value={userInfo.phoneNumber} type='text' className='form-control'></select>
                            <label className='change-header'>
                                Huyện
                            </label>

                            <select value={userInfo.phoneNumber} type='text' className='form-control'></select>


                            <button className='btn-update btn'>Cập nhật địa chỉ</button>


                        </div>
                    </div>
                </div>


            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
