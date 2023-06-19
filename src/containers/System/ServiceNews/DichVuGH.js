import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DichVuGH.scss'

import Header from '../../HomePage/Header';
import HomeFooter from '../../HomePage/HomeFooter';


class DichVuGH extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onChoosen: 1
        }
    }

    componentDidMount() {
    }




    render() {
        return (
            <div >
                <Header></Header>
                <div className='service-page'>
                    {/* Section solution */}
                    <section className='section-solution'>
                        <div className='banner-image-wrapper'>
                            <picture>
                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/banner-sv-chuyenphat.webp'></img>
                            </picture>
                            <div className='form-solution'>
                                <div className='form-wrapper'>
                                    <div className='wrapper-title'>
                                        <div className='s-title'>
                                            <h2>Đăng ký ngay</h2>
                                        </div>
                                    </div>

                                    <div className='wrapper-body'>
                                        <div className='form-support'>
                                            <div className='row'>
                                                <div className='col-sm-12 col-xs-12'>
                                                    <div className='input-group'>
                                                        <input placeholder='Họ và tên' className='form-control'></input>
                                                    </div>
                                                </div>

                                                <div className='col-sm-6 col-xs-12'>
                                                    <div className='input-group'>
                                                        <input placeholder='Email' className='form-control'></input>
                                                    </div>
                                                </div>

                                                <div className='col-sm-6 col-xs-12'>
                                                    <div className='input-group'>
                                                        <input placeholder='Số điện thoại' className='form-control'></input>
                                                    </div>
                                                </div>

                                                <div className='col-lg-6 col-md-12 col-sm-12'>
                                                    <div className='input-group'>
                                                        <select className='form-control'>
                                                            <option>Tỉnh/Thành phố</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='col-lg-6 col-md-12 col-sm-12'>
                                                    <div className='input-group'>
                                                        <select className='form-control'>
                                                            <option>Quận/Huyện</option>
                                                        </select>
                                                    </div>
                                                </div>

                                                <div className='col-lg-12 col-md-12 col-sm-12'>
                                                    <div className='input-group'>
                                                        <input placeholder='Địa chỉ (số nhà, tên tòa nhà, tên đường, tên khu vực)' className='form-control'></input>
                                                    </div>
                                                </div>

                                                <div className='col-lg-12'>
                                                    <button className='support-btn'>Đăng ký nhận tư vấn</button>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section advantage */}

                    <section className='section-advantage'>
                        <div className='container'>
                            <div className='row'>
                                <div style={{ display: 'flex', width: '100%', height: '290px' }}>
                                    <div className='col-lg-4'>
                                        <div className='advantage-box'>
                                            <div className='advantage-icon'>
                                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_advantages1.webp'></img>
                                            </div>

                                            <div className='advantage-title'>
                                                <h3>MIỄN PHÍ LẤY HÀNG</h3>
                                                <p>
                                                    GHLE sẽ không thu phí lấy hàng cho các đơn hàng nhân viên giao nhận đến tận nơi để nhận hàng.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='advantage-box'>
                                            <div className='advantage-icon'>
                                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_advantages3.webp'></img>
                                            </div>

                                            <div className='advantage-title'>
                                                <h3>MIỄN PHÍ GIAO LẠI</h3>
                                                <p>
                                                    GTrong trường hợp giao hàng lần đầu không thành công, GHLE sẽ miễn phí giao lại 2 lần tiếp theo trước khi hoàn trả hàng cho người gửi.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='advantage-box'>
                                            <div className='advantage-icon'>
                                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_advantages4.webp'></img>
                                            </div>

                                            <div className='advantage-title'>
                                                <h3>CHIẾT KHẤU KHI NẠP GHLE XU</h3>
                                                <p>
                                                    Là hình thức thanh toán trả trước; nạp GHLE Xu để được hoàn tiền vào ví lên đến 6% số tiền đã nạp.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section pricing */}
                    <section className='section-pricing'>
                        <div className='container'>
                            <div style={{ marginBottom: '30px' }} className='pricing-title'>
                                <h2>Bảng giá dịch vụ</h2>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12 col-xs-12 col-left'>
                                    <div className='pricing-tab'>
                                        <ul className='pricing-list'>
                                            <li onClick={() => { this.setState({ onChoosen: 1 }) }} className={this.state.onChoosen === 1 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 1 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Bảng giá nội tỉnh</span>
                                                </a>
                                            </li>

                                            <li onClick={() => { this.setState({ onChoosen: 2 }) }} className={this.state.onChoosen === 2 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 2 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Bảng giá nội vùng</span>
                                                </a>
                                            </li>

                                            <li onClick={() => { this.setState({ onChoosen: 3 }) }} className={this.state.onChoosen === 3 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 3 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Bảng giá liên vùng đặc biệt</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-md-8 hidden-sm hidden-xs col-right'>
                                    <div className='tab-content'>
                                        <div className='tab-panel'>
                                            <img src={this.state.onChoosen === 1 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_banner1.jpg' :
                                                this.state.onChoosen === 2 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_banner2.webp' :
                                                    this.state.onChoosen === 3 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_banner4.webp' : ''
                                            }></img>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Section process */}
                    <section className='section-process'>
                        <div className='container'>
                            <div className='text-center'>
                                <h2>Quy trình giao nhận</h2>
                            </div>

                            <div className='process-content'>
                                <div className='process-bar'>
                                    <div className='process-step'>
                                        <div className='ic-step'>
                                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_process1.webp'></img>
                                        </div>
                                        <div className='title-step'>
                                            <h3> Đăng nhập/ <br /> Đăng ký</h3>
                                            <p>Đăng nhập hoặc tạo tài khoản mới trên app GHN hoặc website khachhang.ghn.vn để bắt đầu.</p>
                                        </div>
                                    </div>

                                    <div className='process-step'>
                                        <div className='ic-step'>
                                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_process2.webp'></img>
                                        </div>
                                        <div className='title-step'>
                                            <h3>Tạo đơn hàng</h3>
                                            <p>Tạo đơn hàng trên app GHN Express / website khachhang.ghn.vn, hoặc ghé hệ thống 2000 điểm gửi hàng GHN toàn quốc.
                                            </p>
                                        </div>
                                    </div>

                                    <div className='process-step'>
                                        <div className='ic-step'>
                                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_process3.webp'></img>
                                        </div>
                                        <div className='title-step'>
                                            <h3>Lấy hàng</h3>
                                            <p>Bàn giao hàng cần gửi cho tài xế GHN tại địa chỉ người gửi cung cấp.</p>
                                        </div>
                                    </div>

                                    <div className='process-step'>
                                        <div className='ic-step'>
                                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_process4.webp'></img>
                                        </div>
                                        <div className='title-step'>
                                            <h3>Theo dõi tình trạng đơn hàng</h3>
                                            <p>Người gửi quản lý và theo dõi tình trạng đơn hàng thông qua app GHN hoặc website khachhang.ghn.vn.</p>
                                        </div>
                                    </div>

                                    <div className='process-step'>
                                        <div className='ic-step'>
                                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_process5.webp'></img>
                                        </div>
                                        <div className='title-step'>
                                            <h3>Giao hàng</h3>
                                            <p>GHN giao hàng cho người nhận, thu tiền hộ (COD) theo yêu cầu của người gửi.</p>
                                        </div>
                                    </div>

                                    <div className='process-step'>
                                        <div className='ic-step'>
                                            <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/cp_process6.webp'></img>
                                        </div>
                                        <div className='title-step'>
                                            <h3>Nhận tiền thu hộ</h3>
                                            <p>GHN hoàn trả tiền thu hộ cho người gửi thông qua tài khoản ngân hàng xuyên suốt các ngày trong tuần.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <HomeFooter></HomeFooter>


            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DichVuGH);








