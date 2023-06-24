import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './Report.scss'
import notFoundImg from '../../../../assets/notfound.svg'
import { getUserOrder } from '../../../../services/userService';
import moment from 'moment';
class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderWaitarr: [],
            orderTakeWaitarr: [],
            orderSendingarr: [],
            orderReSendarr: [],
            orderSuccessarr: [],
            orderCancelarr: [],
            orderLostarr: [],
            date: moment(new Date).format('HH:mm DD/MM/YYYY')
        }
    }

    async componentDidMount() {
        const status = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12']
        await status.map(async (item, index) => {
            let orderWait = await getUserOrder({
                id: this.props.userInfo.id,
                status: item,
                startDate: '',
                endDate: ''
            })
            console.log(orderWait.data)
            if (item === 'S2') {
                let data = orderWait.data
                await this.setState({
                    orderWaitarr: [...this.state.orderWaitarr, ...data],

                })
            }

            if (item === 'S6' || item === 'S11') {
                let data = orderWait.data
                await this.setState({
                    orderTakeWaitarr: [...this.state.orderTakeWaitarr, ...data],

                })
            }

            if (item === 'S3' || item === 'S4' || item === 'S8') {
                let data = orderWait.data
                await this.setState({
                    orderSendingarr: [...this.state.orderSendingarr, ...data],

                })
            }

            if (item === 'S7' || item === 'S10') {
                let data = orderWait.data
                await this.setState({
                    orderReSendarr: [...this.state.orderReSendarr, ...data],

                })
            }

            if (item === 'S9' || item === 'S5') {
                let data = orderWait.data
                await this.setState({
                    orderSuccessarr: [...this.state.orderSuccessarr, ...data],

                })
            }

            if (item === 'S1') {
                let data = orderWait.data
                await this.setState({
                    orderCancelarr: [...this.state.orderCancelarr, ...data],

                })
            }

            if (item === 'S12') {
                let data = orderWait.data
                await this.setState({
                    orderLostarr: [...this.state.orderLostarr, ...data],

                })
            }



        })
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
                                    <span className='live-header'>{`Cập nhật lúc ${this.state.date}`}</span>
                                </div>

                                <div className='order-count-header2'>
                                    Báo cáo vận hành ngày hôm nay
                                    <span className='live-header'> - Live  <i className="dot fas fa-circle"></i></span>

                                </div>

                                <div className='report-card'>
                                    <div className='row top-content'>
                                        <div className='col-5'>
                                            <div className='box-content'>
                                                <div className='box-header'>Chờ xác nhận</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>{this.state.orderWaitarr.length}</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Chờ bàn giao</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>{this.state.orderTakeWaitarr.length}</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Đã bàn giao-đang giao</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>{this.state.orderSendingarr.length}</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-7'>
                                            <div className='box-content'>
                                                <div className='box-header'>Hàng thất lạc hư hỏng</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>{this.state.orderLostarr.length}</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Hoàn tất</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>{this.state.orderSuccessarr.length}</span>
                                                    {' đơn hàng'}
                                                    <i className="fas fa-chevron-right icon"></i>
                                                </div>
                                            </div>

                                            <div className='box-content'>
                                                <div className='box-header'>Đơn hủy</div>
                                                <div className='box-value'>
                                                    <span style={{ fontSize: '24px' }}>{this.state.orderLostarr.length}</span>
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
                                                <span>{this.state.orderReSendarr.length}</span>
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

                                    <span className='live-header'>{` Cập nhật lúc ${this.state.date}`}</span>
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
