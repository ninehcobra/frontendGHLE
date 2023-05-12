import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Map.scss';
import { FormattedMessage } from 'react-intl';


class Map extends Component {


    render() {
        return (
            <div className='section-map'>
                <div className='map-container'>
                    <div className='row'>
                        <div class="col-md-4 col-sm-12 col-xs-12 col-left">
                            <div class="s-title">
                                <h2><FormattedMessage id="home-header.post-offices" />
                                    <span class="text-color"><FormattedMessage id="home-header.app-name" /></span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='row map'>
                        <div className='col-md-4 col-sm-12 col-xs-12 col-left'>
                            <div className='address-map'>
                                <div className='tab-content'>
                                    <select className='change-tinh'>
                                        <option value="all">Chọn tỉnh/Thành phố</option>
                                        <option value="Hồ Chí Minh" data-tinh="HC">Hồ Chí Minh</option>
                                        <option value="Hà Nội" data-tinh="HI">Hà Nội</option>
                                        <option value="An Giang" data-tinh="AG">An Giang</option>
                                        <option value="Bà Rịa - Vũng Tàu" data-tinh="BV">Bà Rịa - Vũng Tàu</option>
                                        <option value="Bắc Giang" data-tinh="BG">Bắc Giang</option>
                                        <option value="Bắc Kạn" data-tinh="BK">Bắc Kạn</option>
                                        <option value="Bạc Liêu" data-tinh="BL">Bạc Liêu</option>
                                        <option value="Bắc Ninh" data-tinh="BN">Bắc Ninh</option>
                                        <option value="Bến Tre" data-tinh="BT">Bến Tre</option>
                                        <option value="Bình Định" data-tinh="BD">Bình Định</option>
                                        <option value="Bình Dương" data-tinh="BI">Bình Dương</option>
                                        <option value="Bình Phước" data-tinh="BP">Bình Phước</option>
                                        <option value="Bình Thuận" data-tinh="BU">Bình Thuận</option>
                                        <option value="Cà Mau" data-tinh="CM">Cà Mau</option>
                                        <option value="Cần Thơ" data-tinh="CN">Cần Thơ</option>
                                        <option value="Cao Bằng" data-tinh="CB">Cao Bằng</option>
                                        <option value="Đà Nẵng" data-tinh="DA">Đà Nẵng</option>
                                        <option value="Đắk Lắk" data-tinh="DC">Đắk Lắk</option>
                                        <option value="Đắk Nông" data-tinh="DO">Đắk Nông</option>
                                        <option value="Điện Biên" data-tinh="DB">Điện Biên</option>
                                        <option value="Đồng Nai" data-tinh="DN">Đồng Nai</option>
                                        <option value="Đồng Tháp" data-tinh="DT">Đồng Tháp</option>
                                        <option value="Gia Lai" data-tinh="GL">Gia Lai</option>
                                        <option value="Hà Giang" data-tinh="HG">Hà Giang</option>
                                        <option value="Hà Nam" data-tinh="HM">Hà Nam</option>
                                        <option value="Hà Tĩnh" data-tinh="HT">Hà Tĩnh</option>
                                        <option value="Hải Dương" data-tinh="HD">Hải Dương</option>
                                        <option value="Hải Phòng" data-tinh="HP">Hải Phòng</option>
                                        <option value="Hậu Giang" data-tinh="HU">Hậu Giang</option>
                                        <option value="Hòa Bình" data-tinh="HO">Hòa Bình</option>
                                        <option value="Hưng Yên" data-tinh="HY">Hưng Yên</option>
                                        <option value="Khánh Hòa" data-tinh="KH">Khánh Hòa</option>
                                        <option value="Kiên Giang" data-tinh="KG">Kiên Giang</option>
                                        <option value="Kon Tum" data-tinh="KT">Kon Tum</option>
                                        <option value="Lai Châu" data-tinh="LI">Lai Châu</option>
                                        <option value="Lâm Đồng" data-tinh="LD">Lâm Đồng</option>
                                        <option value="Lạng Sơn" data-tinh="LS">Lạng Sơn</option>
                                        <option value="Lào Cai" data-tinh="LO">Lào Cai</option>
                                        <option value="Long An" data-tinh="LA">Long An</option>
                                        <option value="Nam Định" data-tinh="ND">Nam Định</option>
                                        <option value="Nghệ An" data-tinh="NA">Nghệ An</option>
                                        <option value="Ninh Bình" data-tinh="NB">Ninh Bình</option>
                                        <option value="Ninh Thuận" data-tinh="NT">Ninh Thuận</option>
                                        <option value="Phú Quốc" data-tinh="PQ">Phú Quốc</option>
                                        <option value="Phú Thọ" data-tinh="PT">Phú Thọ</option>
                                        <option value="Phú Yên" data-tinh="PY">Phú Yên</option>
                                        <option value="Quảng Bình" data-tinh="QB">Quảng Bình</option>
                                        <option value="Quảng Nam" data-tinh="QM">Quảng Nam</option>
                                        <option value="Quảng Ngãi" data-tinh="QG">Quảng Ngãi</option>
                                        <option value="Quảng Ninh" data-tinh="QN">Quảng Ninh</option>
                                        <option value="Quảng Trị" data-tinh="QT">Quảng Trị</option>
                                        <option value="Sóc Trăng" data-tinh="ST">Sóc Trăng</option>
                                        <option value="Sơn La" data-tinh="SL">Sơn La</option>
                                        <option value="Tây Ninh" data-tinh="TN">Tây Ninh</option>
                                        <option value="Thái Bình" data-tinh="TB">Thái Bình</option>
                                        <option value="Thái Nguyên" data-tinh="TY">Thái Nguyên</option>
                                        <option value="Thanh Hóa" data-tinh="TH">Thanh Hóa</option>
                                        <option value="Thừa Thiên Huế" data-tinh="TT">Thừa Thiên Huế</option>
                                        <option value="Tiền Giang" data-tinh="TG">Tiền Giang</option>
                                        <option value="Trà Vinh" data-tinh="TV">Trà Vinh</option>
                                        <option value="Tuyên Quang" data-tinh="TQ">Tuyên Quang</option>
                                        <option value="Vĩnh Long" data-tinh="VL">Vĩnh Long</option>
                                        <option value="Vĩnh Phúc" data-tinh="VT">Vĩnh Phúc</option>
                                        <option value="Yên Bái" data-tinh="YB">Yên Bái</option>
                                    </select>
                                    <select name="select-quan" class="select-quan"><option value="all">Chọn Quận/huyện</option></select>
                                    <div className='address-warehouse'>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8 col-sm-12 col-xs-12 col-right'>
                            <div class="img-map" id="map-store"><iframe src="https://www.google.com/maps/d/u/0/embed?mid=1-3xfJGU9o-Obl742zhlntiBsW2IyO3c&ehbc=2E312F" width="100%" height="576"></iframe></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
