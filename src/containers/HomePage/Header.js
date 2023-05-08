import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'

class Header extends Component {

    render() {


        return (
            <React.Fragment>
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
                <div className='home-header-banner'>
                    <div className='header-banner-img'>

                    </div>
                    <div className='slick-slide-list'>
                        <div className='slick-slide'>
                            <p>Giảm Đến 25% <br /> Khi Mua Phụ Kiện Chính Hãng GHLE</p>
                        </div>
                        <div className='slick-slide'>
                            <p class="">GHN Liên Tục Cập Nhật <br />  Danh Sách Khu Vực Giao Nhận</p>
                        </div>
                        <div className='slick-slide'>
                            <p class="">Dịch Vụ <br /> Giao Hàng Nhanh</p>
                        </div>
                        <div className='slick-slide'>
                            <p class="">Dịch Vụ Kho Bãi Và <br /> Xử Lý Hàng Hoá</p>
                        </div>

                    </div>
                </div>
            </React.Fragment>
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
