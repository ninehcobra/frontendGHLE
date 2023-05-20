import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageOrder.scss'
class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }


    }


    componentDidMount() {
    }


    render() {
        return (
            <div className='manage-order-body mt-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='row order-info' >
                            <div className='col-md-4 offset-md-2'>
                                <div className='sender-info'>
                                    <div className='info-title'>
                                        | Bên gửi
                                    </div>
                                    <div>
                                        <span>
                                            <div className='shop-name'>Con cá tra - 0797260870</div>
                                            <div className='shop-address'>Ấp 3 An Phước</div>
                                        </span>
                                        <div className='pick-station'>
                                            <label className='title-pick'>
                                                <span>
                                                    <i className='far fa-square'></i>
                                                    Gửi hàng tại điểm giao nhận GHN
                                                </span>
                                                <span className='note'>
                                                    <i className="fas fa-question-circle fz-12"></i>
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 offset-md-0'>
                                <div className='return-info-check right'>
                                    <div className='title-return'>
                                        <div className='check'>
                                            <i className='far fa-square'></i>
                                            &nbsp;
                                            <div className='text fz-12'>Thêm địa chỉ trả hàng chuyển hoàn</div>
                                            &nbsp;
                                            <i className='fas fa-question-circle fz-12'></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='return-info-check right'>
                                    <label>Chọn ca lấy hàng</label>
                                    <div >
                                        <select className='form-control'>
                                            <option>Chọn ca lấy hàng</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2"><hr /></div>
                    <div className='row'>
                        <div className='col-md-4 offset-md-2'>
                            <div className='deliver-info left'>
                                <div className='info-title'> | Bên nhận</div>
                                <label>Số điện thoại</label>
                                <input className='form-control' type='text' placeholder='Nhập số điện thoại'></input>
                                <label>Họ tên</label>
                                <input className='form-control' type='text' placeholder='Nhập họ tên'></input>
                            </div>
                        </div>
                        <div className='col-md-4 offset-md-0'>
                            <div className='deliver-info right'>
                                <div className='info-title'></div>
                                <label>Địa chỉ</label>
                                <input className='form-control' type='text' placeholder='Nhập địa chỉ'></input>
                                <label>Tỉnh-Thành phố</label>
                                <input className='form-control' type='text' placeholder='Chọn tỉnh/thành phố'></input>
                                <label>Quận-Huyện</label>
                                <input className='form-control' type='text' placeholder='Chọn quận/huyện'></input>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2"><hr /></div>
                    <div className='row'>
                        <div className='col-md-8 offset-md-2'>
                            <div className='info-product-title'>
                                | Sản phẩm
                            </div>
                            <div className='list-package'>
                                <div className='package-item'>
                                    <div className='pick-image-container'>
                                        <div className='pick-image'>
                                            <div className='pick-image-title'><div>Up anh</div></div>
                                        </div>
                                    </div>
                                    <div className='item-name mx-1'>
                                        <div className='block-center'>
                                            <div className='packet-title mr-1'>1.</div>
                                            <div className='product-input'>
                                                <input placeholder='Nhap ten san pham' className='custom-input form-control'></input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='item-code'>
                                        <input placeholder='Nhap ma san pham' className='custom-input form-control'></input>
                                    </div>
                                    <div className='item-info ml-1'>
                                        <div className='block-center'>
                                            <div class="package-title">KL (gam)</div>
                                            <input value={0} className='mx-1 custom-input form-control'></input>
                                            <div class="package-title">SL</div>
                                            <input value={1} className='mx-1 custom-input form-control'></input>
                                            <div className='package-add-icon'>
                                                <i className="fa fa-plus-square"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='row' style={{ width: '100%', marginLeft: '0' }}>
                        <div className='col-md-8 offset-md-2 packet-full-info'>
                            <div className='info-title'>| Thông tin gói hàng </div>
                            <div className='package-border'>

                            </div>
                        </div>
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);








