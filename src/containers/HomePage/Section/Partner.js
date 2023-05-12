import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Partner.scss';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import avatar1 from "../../../assets/images/avatar1.jpg"
import avatar2 from "../../../assets/images/avatar2.jpg"
import avatar3 from "../../../assets/images/avatar3.jpg"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Partner extends Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 1500,
        };
        return (
            <div className='section-partner'>
                <div className='container'>
                    <div className='s-title'>
                        <h2>
                            Đối tác của
                            <span className='text-color'><FormattedMessage id="home-header.app-name" /></span>
                        </h2>
                    </div>

                    <div className='row'>
                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 pd-r2'>
                            <div className='utube-video'>

                                <iframe src='https://www.youtube.com/embed/_Sjf4z7Ui0I?rel=0&autoplay=1'
                                    allowFullScreen></iframe>
                            </div>
                        </div>

                        <div className='col-lg-4 col-md-12 col-sm-12 col-xs-12 pd-l2 partner'>
                            <Slider {...settings}>
                                <div className='item-slide'>
                                    <div className='item-image'>
                                        <img src={avatar3}></img>
                                    </div>
                                    <div className='item-body'>
                                        <div className='body-logo'>
                                            <img src='https://tse4.mm.bing.net/th?id=OIP.MxZx4570NjUDBnvXKJ0_BwAAAA&pid=Api&P=0' />
                                        </div>
                                        <p className='body-txt'>
                                            "Là giảng viên của trường đại học Công nghệ thông tin thuộc đại học Quốc gia Thành phố Hồ Chí Minh. Là người hướng dẫn cho project này."
                                        </p>
                                        <hr className='body-line' />
                                        <p className='body-name'>Nguyễn Trịnh Đông</p>
                                        <small>Lecturers</small>
                                    </div>

                                </div>

                                <div className='item-slide'>
                                    <div className='item-image'>
                                        <img src={avatar1}></img>
                                    </div>
                                    <div className='item-body'>
                                        <div className='body-logo'>
                                            <img src='https://tse4.mm.bing.net/th?id=OIP.MxZx4570NjUDBnvXKJ0_BwAAAA&pid=Api&P=0' />
                                        </div>
                                        <p className='body-txt'>
                                            "Là sinh viên năm k15 của trường đại học Công nghệ thông tin thuộc đại học Quốc gia Thành phố Hồ Chí Minh. Cũng là đồng sở hữu project này."
                                        </p>
                                        <hr className='body-line' />
                                        <p className='body-name'>Trương Nguyễn Công Chính</p>
                                        <small>Project owner</small>
                                    </div>

                                </div>

                                <div className='item-slide'>
                                    <div className='item-image'>
                                        <img src={avatar2}></img>
                                    </div>
                                    <div className='item-body'>
                                        <div className='body-logo'>
                                            <img src='https://tse4.mm.bing.net/th?id=OIP.MxZx4570NjUDBnvXKJ0_BwAAAA&pid=Api&P=0' />
                                        </div>
                                        <p className='body-txt'>
                                            "Là sinh viên năm k15 của trường đại học Công nghệ thông tin thuộc đại học Quốc gia Thành phố Hồ Chí Minh. Cũng là đồng sở hữu project này."
                                        </p>
                                        <hr className='body-line' />
                                        <p className='body-name'>Nguyễn Thái Bảo</p>
                                        <small>Project owner</small>
                                    </div>

                                </div>

                            </Slider>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Partner);
