import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './OrderReception.scss'
import * as actions from '../../../store/actions'
import { getOrderReceptionService } from '../../../services/userService';
import { withRouter } from 'react-router';
let numeral = require('numeral');

class OrderReception extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderReception: ''
        }
    }

    async componentDidMount() {
        await this.getOrderReception()
    }

    getOrderReception = async () => {
        let res = await getOrderReceptionService()
        if (res && res.errCode === 0) {
            this.setState({
                orderReception: res.data
            })

        }

    }

    handleViewDetailProduct = (order) => {
        console.log(order)
        this.props.history.push(`/orders/${order.id}`)
    }


    render() {
        let orderReception = this.state.orderReception
        return (
            <div className="users-container">

                <div className='title text-center'>Tiếp nhận đơn hàng</div>
                <div className='mx-1'>
                </div>
                <table id="customers" className='mt-3 mx-1'>
                    <tbody>
                        <tr style={{ cursor: 'pointer' }}>
                            <th>Mã đơn hàng</th>
                            <th>Địa chỉ lấy hàng</th>
                            <th>Địa chỉ giao hàng</th>
                            <th>Bên trả tiền</th>
                            <th>Tiền thu hộ (vnđ)</th>
                            <th>Phí giao hàng (vnđ)</th>
                            <th>Khối lượng(gam)</th>
                            <th>Xác nhận</th>
                        </tr>
                        {orderReception && orderReception.map((item, index) => {
                            return (


                                <tr onClick={() => this.handleViewDetailProduct(item)}>
                                    <td>{item.id}</td>
                                    <td>{item.takeAddress}</td>
                                    <td>{item.receiverAddress}</td>
                                    <td>{item.payOption === "P1" ? "Bên gửi" : "Bên nhận"}</td>
                                    <td>{numeral(item.CODCost).format("0,0")}</td>
                                    <td>{numeral(item.fee).format("0,0")}</td>
                                    <td>{item.totalWeight}</td>
                                    <td>{item.status}</td>
                                </tr>

                            )
                        })}


                    </tbody>

                </table>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        orderReception: state.admin.orderReception
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderReceptionStart: () => dispatch(actions.fetchOrderReceptionStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderReception));
