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

        const settings2 = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 6,
            slidesToScroll: 1,
            autoplay: true,
            speed: 1500,
        };
        return (
            <div className='section-partner'>
                <div className='container'>
                    <div className='s-title'>
                        <h2>
                            <FormattedMessage id="home-header.member" />
                            <span className='text-color'><FormattedMessage id="home-header.app-name" /></span>
                        </h2>
                    </div>

                    <div className='row'>
                        <div className='col-lg-8 col-md-12 col-sm-12 col-xs-12 pd-r2'>
                            <div className='utube-video'>

                                <iframe src='https://www.youtube.com/embed/UH4CyrzNPDU'
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

                    <Slider {...settings2}>
                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner1.webp'></img>

                        </div>

                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner2.webp'></img>
                        </div>

                        <div className='item-slide-partner'>

                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner3.webp'></img>
                        </div>
                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner4.webp'></img>

                        </div>

                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner5.webp'></img>
                        </div>

                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner6.webp'></img>
                        </div>
                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner7.webp'></img>
                        </div>

                        <div className='item-slide-partner'>
                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo_partner8.webp'></img>
                        </div>

                    </Slider>
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
