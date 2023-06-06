import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import './CustomerManageOrder.scss'
import DatePicker from '../../../components/Input/DatePicker'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Order from './Order/Order';
import moment from 'moment';
import FormattedDate from '../../../components/Formating/FormattedDate'
class CustomerManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: 'btn1',
            currentDate: ''
        }
    }

    async componentDidMount() {

    }

    handleOnChangeDatePicker = (date) => {
        this.setState({
            currentDate: date
        })
    }

    handleOnClick = (name) => {
        this.setState({
            isSelected: name
        })
    }


    render() {
        const { processLogout, language, userInfo } = this.props;
        const { isSelected } = this.state

        return (


            <div className="body-order-content" >
                <div className='header-tag'>
                    <div className='nowrap'>
                        <button className={isSelected === 'btn1' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn1')} >Chờ xác nhận <span>0</span></button>
                        <button className={isSelected === 'btn2' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn2')}>Chờ bàn giao <span>0</span></button>
                        <button className={isSelected === 'btn3' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn3')}>Đã bàn giao-Đang giao <span>0</span></button>
                        <button className={isSelected === 'btn4' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn4')}>Chờ xác nhận giao lại<span>0</span></button>
                        <button className={isSelected === 'btn5' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn5')}>Hoàn tất <span>0</span></button>
                        <button className={isSelected === 'btn6' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn6')}>Đơn hủy <span>0</span></button>
                        <button className={isSelected === 'btn7' ? " btn btn-tag active" : "btn btn-tag"} onClick={() => this.handleOnClick('btn7')}>Hàng thất lạc hư hỏng<span>0</span></button>
                    </div>
                </div>

                <div className='body-content'>
                    <div className='filter row'>
                        <div className='filter-calendar'>
                            <div className='date-label'>Thời gian tạo đơn</div>
                            <div className='box'>
                                <span> Từ</span>
                                <DatePicker className="date-picker" onChange={this.handleOnChangeDatePicker}
                                    value={new Date(new Date().getTime()).setMonth(new Date(new Date().getTime()).getMonth() - 1)}>

                                </DatePicker>
                                <i className="fas fa-calendar-alt calendar-icon"></i>

                            </div>

                        </div>

                        <div className='filter-calendar' style={{ marginTop: '17px' }}>
                            <div className='date-label'></div>
                            <div className='box'>
                                <span> Đến</span>
                                <DatePicker className="date-picker" onChange={this.handleOnChangeDatePicker} value={new Date()}>

                                </DatePicker>
                                <i className="fas fa-calendar-alt calendar-icon"></i>

                            </div>

                        </div>
                    </div>

                    <div className='body'>
                        <Order></Order>
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
