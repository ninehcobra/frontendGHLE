import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './CustomerManageOrder.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Order from './Order/Order';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate'
import { getUserOrder } from '../../../services/userService';
import ReactToPrint from 'react-to-print';
class CustomerManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: 'btn1',
            startDate: new Date(new Date().getTime()).setMonth(new Date(new Date().getTime()).getMonth() - 1),
            endDate: new Date(),
            orderWaitarr: [],
            orderTakeWaitarr: [],
            orderSendingarr: [],
            orderReSendarr: [],
            orderSuccessarr: [],
            orderCancelarr: [],
            orderLostarr: [],
            arrOrder: []

        }
    }

    async componentDidMount() {
        await this.getAllOrder()

    }

    getAllOrder = async () => {
        const status = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'S11', 'S12']
        await Promise.all(status.map(async (item, index) => {
            let orderWait = await getUserOrder({
                id: this.props.userInfo.id,
                status: item,
                startDate: this.state.startDate,
                endDate: this.state.endDate
            })

            if (item === 'S2') {
                let data = orderWait.data
                await this.setState({
                    orderWaitarr: [...this.state.orderWaitarr, ...data],
                    arrOrder: [...this.state.arrOrder, ...data]
                })
            }

            if (item === 'S13' || item === 'S14') {
                let data = orderWait.data
                await this.setState({
                    orderTakeWaitarr: [...this.state.orderTakeWaitarr, ...data],

                })
            }

            if (item === 'S3' || item === 'S4' || item === 'S8' || item === 'S15' || item === 'S16') {
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

            if (item === 'S5') {
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
        )
    }



    handleOnChangeDatePicker = async (date, con = 0) => {
        if (con === 1) {
            if (date[0] !== this.state.startDate) {
                this.setState({
                    orderWaitarr: [],
                    orderTakeWaitarr: [],
                    orderSendingarr: [],
                    orderReSendarr: [],
                    orderSuccessarr: [],
                    orderCancelarr: [],
                    orderLostarr: [],
                    arrOrder: []
                })
                await this.getAllOrder()
            }
            this.setState({
                startDate: date[0]
            })
        }
        else {
            if (date[0] !== this.state.endDate) {
                this.setState({
                    orderWaitarr: [],
                    orderTakeWaitarr: [],
                    orderSendingarr: [],
                    orderReSendarr: [],
                    orderSuccessarr: [],
                    orderCancelarr: [],
                    orderLostarr: [],
                    arrOrder: []
                })
                await this.getAllOrder()
            }
            this.setState({
                endDate: date[0]
            })
        }


    }

    handleOnClick = async (name) => {

        this.setState({
            isSelected: name
        })
        if (name === 'btn1') {
            this.setState({
                arrOrder: this.state.orderWaitarr
            })
        }
        else if (name === 'btn2') {
            this.setState({
                arrOrder: this.state.orderTakeWaitarr
            })
        }
        else if (name === 'btn3') {
            this.setState({
                arrOrder: this.state.orderSendingarr
            })
        }
        else if (name === 'btn4') {
            this.setState({
                arrOrder: this.state.orderReSendarr
            })
        }
        else if (name === 'btn5') {
            this.setState({
                arrOrder: this.state.orderSuccessarr
            })
        }
        else if (name === 'btn6') {
            this.setState({
                arrOrder: this.state.orderCancelarr
            })
        }
        else if (name === 'btn7') {
            this.setState({
                arrOrder: this.state.orderLostarr
            })
        }
    }

    setArr = () => {

    }


    render() {
        const { processLogout, language, userInfo } = this.props;
        const { isSelected } = this.state

        return (


            <div className="body-order-content" >





                <div className='header-tag'>
                    <div className='nowrap'>
                        <button className={isSelected === 'btn1' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn1')} >Chờ xác nhận <span>{this.state.orderWaitarr.length}</span></button>
                        <button className={isSelected === 'btn2' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn2')}>Chờ bàn giao <span>{this.state.orderTakeWaitarr.length}</span></button>
                        <button className={isSelected === 'btn3' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn3')}>Đã bàn giao-Đang giao <span>{this.state.orderSendingarr.length}</span></button>
                        <button className={isSelected === 'btn4' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn4')}>Chờ xác nhận giao lại<span>{this.state.orderReSendarr.length}</span></button>
                        <button className={isSelected === 'btn5' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn5')}>Hoàn tất <span>{this.state.orderSuccessarr.length}</span></button>
                        <button className={isSelected === 'btn6' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn6')}>Đơn hủy <span>{this.state.orderCancelarr.length}</span></button>
                        <button className={isSelected === 'btn7' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn7')}>Hàng thất lạc hư hỏng<span>{this.state.orderLostarr.length}</span></button>
                    </div>
                </div>

                <div className='body-content'>
                    <div className='filter row'>
                        <div className='filter-calendar'>
                            <div className='date-label'>Thời gian tạo đơn</div>
                            <div className='box'>
                                <span> Từ</span>
                                <DatePicker className="date-picker" onChange={(e) => this.handleOnChangeDatePicker(e, 1)}
                                    value={this.state.startDate}>

                                </DatePicker>
                                <i className="fas fa-calendar-alt calendar-icon"></i>

                            </div>

                        </div>

                        <div className='filter-calendar' style={{ marginTop: '17px' }}>
                            <div className='date-label'></div>
                            <div className='box'>
                                <span> Đến</span>
                                <DatePicker className="date-picker" onChange={this.handleOnChangeDatePicker} value={this.state.endDate}>

                                </DatePicker>
                                <i className="fas fa-calendar-alt calendar-icon"></i>

                            </div>

                        </div>
                    </div>

                    <div className='body'>
                        <Order arr={this.state.arrOrder} startDate={this.state.startDate} endDate={this.state.endDate}></Order>
                    </div>



                </div>
            </div >


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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerManageOrder);
