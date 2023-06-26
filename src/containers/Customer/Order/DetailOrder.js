import React, { Component } from 'react';
import { connect } from "react-redux";
import search from '../../../assets/search.png'
import missing from '../../../assets/missing.png'
import logo from '../../../assets/logo-giaohangle.png'
import './DetailOrder.scss'
import { getOrderDetail } from '../../../services/userService';
import axios from '../../../axios';
class DetailOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orderId: this.props.match.params.id,
            history: [],
            isValid: false,
            id: ''
        }
    }

    async componentDidMount() {

        let history = await getOrderDetail(this.state.orderId)
        if (history.errCode === 0) {
            history.data.reverse()
            this.setState({
                history: history.data,
                isValid: true
            })
        }


    }

    formatDay = (time) => {
        var dateString = time;
        var date = new Date(dateString);

        var options = { day: 'numeric', month: 'long', year: 'numeric' };
        var formattedDate = date.toLocaleDateString('vi-VN', options);

        return formattedDate
    }

    formatTime = (time) => {
        var date = new Date(time);

        var hour = date.getUTCHours();
        var minute = date.getUTCMinutes();

        return `${hour + 7}:${minute}`;
    }

    changeInput = (e) => {
        let value = e.target.value
        this.setState({
            id: value
        })
    }

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Xử lý logic khi nhấn phím Enter ở đây


            if (event.target.value) {
                window.location.href = `/orders/` + event.target.value
            }

        }
    };

    render() {
        let orderId = this.state.orderId
        return (
            <div className='Layout'>

                <div className='home-header-container sticky-header'>
                    <div className='home-header-content'>
                        <div className='container'>
                            <div className='row'>
                                <div className='header-logo col-md-2 col-sm-2 col-2'>
                                    <div className="img-container">
                                        <a href={"/"}>
                                            <img src={logo}></img>
                                        </a>
                                    </div>
                                </div>
                                <div className='col-md-8 col-sm-10 col-10'>
                                    <div className='header-search'>
                                        <div className='input-search'>
                                            <input onKeyPress={this.handleKeyPress} value={this.state.id} onChange={(e) => this.changeInput(e)} placeholder='Nhập mã đơn hàng để tìm kiếm' className='search-input form-control'></input>
                                        </div>
                                        <a href={"/orders/" + this.state.id} style={{ textDecoration: "none" }}>
                                            <button type='button' className='search-button'>
                                                <i class="fas fa-search"></i>
                                                <span>TÌM KIẾM
                                                </span>
                                            </button>
                                        </a>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='detail-order-body'>

                    {!this.state.isValid ?
                        this.state.orderId ?


                            <div className='order-tracking' >
                                <div className='order-tracking-body'>
                                    <img src={search}></img>
                                    <div className='error-title'>Mã đơn hàng không đúng</div>
                                    <div className='error-content'>Chúng tôi không tìm thấy mã đơn hàng của bạn trong hệ thống.</div>
                                    <div className='error-content'>Vui lòng kiểm tra lại mã đơn hàng.</div>
                                </div>
                            </div>
                            :
                            <div className='order-tracking' >
                                <div className='order-tracking-body'>
                                    <img src={missing}></img>
                                    <div className='error-title'>Chưa nhập mã đơn hàng</div>
                                    <div className='error-content'>Vui lòng nhập mã đơn hàng để kiểm tra</div>

                                </div>
                            </div>


                        :
                        <div className='container'>
                            <div className='header'>
                                <span>Mã đơn hàng: {this.state.orderId}</span>
                            </div>
                            <div className='tab-content'>
                                <div className='item'>
                                    <div className='item-info' >
                                        {this.state.history.map((item, index) => {
                                            return (
                                                <div className='row' style={{ padding: '10px 0', borderBottom: '1px solid grey' }}>
                                                    <div style={{ borderRight: '1px solid grey' }} class="col-2">
                                                        <div style={{ textAlign: 'right', fontSize: '15px', fontWeight: '600' }}>{this.formatDay(item.createdAt)}</div>
                                                        <div style={{ textAlign: 'right', fontSize: '14px', color: 'grey' }}>{this.formatTime(item.createdAt)}</div>
                                                    </div>
                                                    <div class="col-10" >
                                                        <div style={{ textAlign: 'left', fontSize: '15px', fontWeight: '300' }}>{item.orderStatus}</div>
                                                        <div style={{ textAlign: 'left', fontSize: '14px', color: 'grey' }}>{ }</div>
                                                    </div>

                                                </div>
                                            )
                                        })}



                                    </div>
                                </div>

                            </div>
                        </div>}


                </div>
            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailOrder);
