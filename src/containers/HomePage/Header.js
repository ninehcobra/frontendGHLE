import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'

class Header extends Component {

    render() {


        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <i className='fas fa-bars'></i>
                        <div className='header-logo'></div>

                    </div>
                    <div className='center-content'>
                        <div className='child-content'>
                            <div>
                                <b>Trang chủ</b>
                            </div>
                            <div></div>
                        </div>
                        <div className='child-content'>
                            <div>
                                <b>Dịch vụ</b>
                            </div>
                            <div></div>
                        </div>
                        <div className='child-content'>
                            <div>
                                <b>Tin tức</b>
                            </div>
                            <div></div>
                        </div>
                        <div className='child-content'>
                            <div>
                                <b>Thêm thông tin</b>
                            </div>
                            <div></div>
                        </div>

                    </div>
                    <div className='right-content'>
                        <div>
                            <button> Đăng ký/Đăng nhập</button>
                        </div>
                        <div className='search-form'>
                            <input placeholder='Nhập mã đơn hàng mà bạn cần tra cứu...'></input>
                            <i className="fas fa-search"></i>
                        </div>
                        <div className='flag'>VN</div>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
