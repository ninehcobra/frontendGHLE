import React, { Component } from 'react';
import { connect } from 'react-redux';

import './DichVuKB.scss'

import Header from '../../HomePage/Header';
import HomeFooter from '../../HomePage/HomeFooter';


class DichVuKB extends Component {

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
                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/banner-sv-kho.webp'></img>
                            </picture>

                        </div>
                    </section>

                    {/* Section advantage */}

                    <section className='section-advantage'>
                        <div className='container'>
                            <div className='row'>
                                <div style={{ display: 'flex', width: '100%', height: '410px' }}>
                                    <div className='col-lg-4'>
                                        <div className='advantage-box'>
                                            <div className='advantage-icon'>
                                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_advantages1.webp'></img>
                                            </div>

                                            <div className='advantage-title'>
                                                <h3>CÔNG NGHỆ QUẢN LÝ KHO VẬN HIỆN ĐẠI</h3>
                                                <p>
                                                    Hệ thống quản lý thông minh - trực tuyến 24/7 giúp khách hàng dễ dàng kiểm tra tình trạng hàng hóa, giám sát quá trình xử lý nhanh chóng (lấy hàng, đóng gói, bàn giao đơn vị vận chuyển), theo dõi hành trình giao hàng, truy xuất lịch sử giao dịch để quản lý nhập – xuất – tồn kho, hỗ trợ tích hợp API với hệ thống quản lý sẵn có của khách hàng.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='advantage-box'>
                                            <div className='advantage-icon'>
                                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_advantages2.webp'></img>
                                            </div>

                                            <div className='advantage-title'>
                                                <h3>XỬ LÝ YÊU CẦU BÁN HÀNG ĐA KÊNH</h3>
                                                <p>
                                                    Sở hữu diện tích kho bãi hơn 100.000m2 với cơ sở hạ tầng hiện đại kết hợp cùng mạng lưới 1000 xe tải phủ sóng khắp 63 tỉnh thành, hệ thống quy trình vận hành chuyên nghiệp cho từng đối tượng khách hàng khác nhau, sẵn sàng đáp ứng kịp thời nhu cầu về phát sinh tăng đột biến sản lượng hàng hóa trong mùa cao điểm.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-lg-4'>
                                        <div className='advantage-box'>
                                            <div className='advantage-icon'>
                                                <img src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_advantages3.webp'></img>
                                            </div>

                                            <div className='advantage-title'>
                                                <h3>GIẢI PHÁP KHO VẬN TOÀN DIỆN VÀ TỐI ƯU</h3>
                                                <p>
                                                    Với đội ngũ quản lý trên 15 năm kinh nghiệm, đội ngũ hơn 10.000 nhân viên, tài xế chuyên nghiệp, GHN mang đến các giải pháp kho vận trọn gói giúp khách hàng giải quyết các vấn đề kho bãi, vận chuyển hàng hóa, tăng trưởng kinh doanh nhanh chóng, tiết kiệm chi phí đầu tư vào cơ sở hạ tầng, xóa bỏ nỗi lo về năng lực vận hành kho bãi.
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
                                <h2>Thông tin dịch vụ</h2>
                                <p>GHLE Fulfillment cung cấp đa dạng các loại dịch vụ kho vận giúp khách hàng có nhiều giải pháp và lựa chọn phù hợp</p>
                            </div>
                            <div className='row'>
                                <div className='col-md-4 col-sm-12 col-xs-12 col-left'>
                                    <div className='pricing-tab'>
                                        <ul className='pricing-list'>
                                            <li onClick={() => { this.setState({ onChoosen: 1 }) }} className={this.state.onChoosen === 1 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 1 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Nhập hàng và lưu trữ,<br /> quản lý nhập – xuất – tồn kho</span>
                                                </a>
                                            </li>

                                            <li onClick={() => { this.setState({ onChoosen: 2 }) }} className={this.state.onChoosen === 2 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 2 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Xử lý đơn hàng theo yêu cầu: lấy hàng, đóng gói, bàn giao đơn vị vận chuyển</span>
                                                </a>
                                            </li>

                                            <li onClick={() => { this.setState({ onChoosen: 3 }) }} className={this.state.onChoosen === 3 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 3 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Giao hàng từ kho đến hệ thống siêu thị, chuỗi cửa hàng, nhà bán lẻ</span>
                                                </a>
                                            </li>

                                            <li onClick={() => { this.setState({ onChoosen: 4 }) }} className={this.state.onChoosen === 4 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 4 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Giao hàng từ kho đến người mua hàng online và thu hộ COD</span>
                                                </a>
                                            </li>

                                            <li onClick={() => { this.setState({ onChoosen: 5 }) }} className={this.state.onChoosen === 5 ? 'pricing-item pricing-active' : 'pricing-item'}>
                                                <a>
                                                    <img src={this.state.onChoosen === 5 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_icw1.webp' : 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/sv_price_ic_last%20.webp'}></img>
                                                    <span>Quản lý đổi trả hàng</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='col-md-8 hidden-sm hidden-xs col-right'>
                                    <div className='tab-content'>
                                        <div className='tab-panel'>
                                            <img src={
                                                this.state.onChoosen === 1 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_sv_add1_banner.webp' :
                                                    this.state.onChoosen === 2 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_sv_add2_banner.webp' :
                                                        this.state.onChoosen === 3 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_sv_add3_banner.webp' :
                                                            this.state.onChoosen === 4 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_sv_add4_banner.webp' :
                                                                this.state.onChoosen === 5 ? 'https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/kho_sv_add5_banner.webp' : ''
                                            }></img>
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

export default connect(mapStateToProps, mapDispatchToProps)(DichVuKB);








