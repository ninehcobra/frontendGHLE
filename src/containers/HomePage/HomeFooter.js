import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {


    render() {
        return (
            <>
                <div className='home-footer-top'>
                    <div className='container'>
                        <div className="row">

                            <div className="col-md-4 col-sm-6 col-xs-12 col-lg">
                                <div className="footer-col">
                                    <h4 className="footer-title">
                                        CÔNG TY CỔ PHẦN DỊCH VỤ GIAO HÀNG LẸ
                                    </h4>
                                    <div className="footer-content">
                                        <p>Đây là đồ án 1 của sinh viên Trương Nguyễn Công Chính - 20520884 trường Đại Học Công Nghệ Thông Tin dưới sự hướng dẫn của Th.S Nguyễn Trịnh Đông

                                            <br />Mọi thông tin liên quan đến đồ án có thể liên hệ trực tiếp với tôi (Mr. Chính) để trao đổi </p>
                                        <div className="hr"></div>
                                        <ul>
                                            <li><b><i className="fa fa-map-marker"></i>Địa chỉ: </b>Hẻm 224, ấp 3, xã An Phước, Long Thành, Đồng Nai</li>
                                            <li><b><i className="fa fa-envelope"></i>Email: </b>20520884@gm.uit.edu.vn</li>
                                            <li><b><i className="fa fa-phone"></i>Hotline: </b>0797260870</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-2 col-sm-6 col-xs-12 col-lg">
                                <div className="footer-col footer-link">
                                    <h4 className="footer-title">
                                        VỀ GHN
                                    </h4>
                                    <div className="footer-content toggle-footer">
                                        <ul>

                                            <li>
                                                <a title="Giới thiệu GHN">Giới thiệu GHN</a>
                                            </li>

                                            <li>
                                                <a title="Tuyển dụng">Tuyển dụng</a>
                                            </li>

                                            <li>
                                                <a title="Liên hệ">Liên hệ</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 col-sm-6 col-xs-12 col-lg">
                                <div className="footer-col footer-link">
                                    <h4 className="footer-title">
                                        THÔNG TIN DỊCH VỤ
                                    </h4>
                                    <div className="footer-content toggle-footer">
                                        <ul>

                                            <li>
                                                <a href="/news/1">Chính sách</a>
                                            </li>

                                            <li>
                                                <a href="/news/2" >Quy định</a>
                                            </li>

                                            <li>
                                                <a href="/news/3" >Danh sách cấm</a>
                                            </li>

                                            <li>
                                                <a href="/news/4" >Chính sách bảo mật</a>
                                            </li>

                                            <li>
                                                <a href="/news/5">Hàng hoá không vận chuyển</a>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                            </div>


                            <div className="col-md-3 col-sm-6 col-xs-12 col-lg">
                                <div className="footer-col footer-link">
                                    <h4 className="footer-title">
                                        Kết nối
                                    </h4>
                                    <div className="footer-content toggle-footer">
                                        <ul>

                                            <li>
                                                <a href="https://www.facebook.com/congchinh.truongnguyen.5/" >Facebook</a>
                                            </li>


                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className='home-footer'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6 col-xs-12 col-left'>
                                <p>Bản quyền thuôc về Trương Nguyễn Công Chính - 20520884 &copy; 2023 </p>
                            </div>
                            <div className='col-md-6 col-sm-6 col-xs-12 col-right'>
                                <div className='more-info'>

                                    <p>Thêm thông tin</p>
                                    <a href='https://github.com/ninehcobra/frontendGHLE'>
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href='https://www.facebook.com/congchinh.truongnguyen.5/'>
                                        <i className="fab fa-facebook"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </>

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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
