import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './Report.scss'
import notFoundImg from '../../../../assets/notfound.svg'
class Report extends Component {

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

            <div className="report-container" >
                <div className='report-content'>
                    <div>
                        <span>{"Trang chủ - Báo cáo trực tiếp"}</span>
                    </div>
                    <div className='content1 row'>
                        <div className='col-4'>
                            <div className='order-count'>
                                <div className='order-count-header'>
                                    Báo cáo trạng thái lấy/giao/hoàn hàng của các đơn hàng
                                    <br />
                                    được xử lý ngày hôm nay.
                                    <span className='live-header'>{" Cập nhật lúc 13:33 06/06/2023"}</span>
                                </div>

                                <div className='order-count-header2'>
                                    Báo cáo vận hành ngày hôm nay
                                    <span className='live-header'> - Live  <i className="dot fas fa-circle"></i></span>

                                </div>

                                <div className='report-card'>
                                    <div className='row top-content'>
                                        <div className='col-5'>
                                            <div className='box-content'>
                                                <div className='box-header'>Lấy hàng thành công</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>0</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Lấy hàng thành công</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>0</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Giao thành công</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>0</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-7'>
                                            <div className='box-content'>
                                                <div className='box-header'>Hoàn hàng thành công</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>0</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Giao thất bại - Lưu kho giao lại</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>0</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Hàng thất lạc - Hư hỏng</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>0</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='bottom-content '>
                                        <div className='content-header-box'>
                                            <div className='content-header'>Giao thất bại - Chờ xác nhận giao lại</div>
                                            <div>
                                                <span>0</span>
                                                {"  đơn hàng"}
                                            </div>
                                        </div>
                                        <div>
                                            <i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='order-count' style={{ marginTop: '18px' }}>
                                <div className='order-count-header'>

                                    <span className='live-header'>{" Cập nhật lúc 13:33 06/06/2023"}</span>
                                </div>

                                <div className='order-count-header2'>
                                    Báo cáo dòng tiền
                                    <span className='live-header'> - Live  <i className="dot fas fa-circle"></i></span>

                                </div>

                                <div className='report-card'>
                                    <div className='title-card'>
                                        {"Số dư hiện tại (GHN sắp chuyển cho khách)"}
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>Tiền thu hộ (COD)  <i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i> </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>Giao thất bại - thu tiền  <i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i> </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>Phí dịch vụ tạm thu <i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i> </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>Nợ tồn </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>

                                    <div class="line-break"></div>

                                    <div className='box-text'>
                                        <div className='box-text-title'>Tổng số dư hoàn tất hiện tại </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>

                                    <div className='note-box'>
                                        <span>*Tổng số dư hiện tai = Tiền thu hộ - Phí dịch vụ tạm thu - Nợ tồn</span>
                                    </div>


                                </div>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='order-count' style={{ marginTop: '57px' }}>

                                <div className='report-card'>
                                    <div className='title-card'>
                                        {"Số dư đang xử lý (GHN giữ lại)"}
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>Số dư qua ví  <i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i> </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>Giao thất bại - thu tiền / đang xử lý  <i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i> </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>
                                    <div className='box-text'>
                                        <div className='box-text-title'>COD hàng lưu kho / đang xử lý<i style={{ marginRight: '10px' }} className="fas fa-chevron-right icon"></i> </div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>

                                    <div class="line-break"></div>

                                    <div className='box-text'>
                                        <div className='box-text-title'>Tổng số dư còn lại</div>
                                        <div className='box-text-value'>0 vnđ</div>
                                    </div>

                                    <div className='note-box'>
                                        <span>*Tổng số dư còn lại = Số dư ví + COD hàng lưu kho / đang xử lý</span>
                                    </div>


                                </div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Report);
