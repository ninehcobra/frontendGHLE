import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './OrderReception.scss'
import * as actions from '../../../store/actions'
import { getOrderReceptionService, getAllUsers, setOrderStaff } from '../../../services/userService';
import { withRouter } from 'react-router';
import logo from '../../../assets/logo.png'
import { toast } from 'react-toastify';

let numeral = require('numeral');

class OrderReception extends Component {
    constructor(props) {
        super(props);
        this.state = {
            orderReception: '',
            arrUsers: [],
            warehouseId: this.props.userInfo.warehouseId,
            selectedStaff: '',

            selectedValues: []
        }
    }

    async componentDidMount() {
        await this.getOrderReception(this.props.userInfo.warehouseId)
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.selectedValues !== this.state.selectedValues) {
            await this.getOrderReception(this.props.userInfo.warehouseId)
        }
    }

    getOrderReception = async (id) => {
        let res = await getOrderReceptionService(id)
        if (res && res.errCode === 0) {
            this.setState({
                orderReception: res.data
            })

        }

        let users = await getAllUsers('All')
        this.setState({
            arrUsers: users.users
        })
    }

    handleViewDetailProduct = (order) => {
        console.log(order)
        this.props.history.push(`/orders/${order.id}`)
    }


    onChangeStaff = (e, index) => {
        const value = e.target.value;
        this.setState((prevState) => {
            const updatedValues = [...prevState.selectedValues];
            updatedValues[index] = value;
            return { selectedValues: updatedValues };
        });
    }

    handleAcceptOrder = async (index, id) => {
        console.log(`Selected value for item ${id}:`, this.state.selectedValues[index]);

        let res = await setOrderStaff({
            orderId: id,
            staffId: this.state.selectedValues[index]
        })
        if (res.errCode === 0) {
            toast.success('Đã tiếp nhận và bàn giao đơn cho nhân viên')
            this.setState((prevState) => {
                const updatedValues = [...prevState.selectedValues];
                updatedValues[index] = null;
                return { selectedValues: updatedValues };
            });
        }
    }

    render() {
        let orderReception = this.state.orderReception
        let userInfo = this.props.userInfo
        let arrUsers = this.state.arrUsers

        return (
            <div className='orderreception-body'>
                <div style={{}} className="center">
                    <div className="left">
                        <div className="logo">
                            <img style={{ width: '100%' }} src={logo}></img>
                        </div>
                        <div style={{ marginTop: '40px' }} className="company">
                            <div className="company-name">GHLE</div>
                            <div className="company-description">Tiếp nhận đơn hàng</div>
                            <div className="company-description">STAFF: <span>{' ' + userInfo.lastName + " " + userInfo.firstName}</span></div>
                            <div className='ln'></div>
                        </div>

                    </div>
                    <div className="right">
                        <div className="title">Tiếp nhận đơn hàng</div>
                        <div style={{ textAlign: 'center' }} className="description">{'~Nói với họ là thôi đừng gọi tên tôi, tôi không xuất hiện đâu, tôi không rảnh~'}</div>
                        <div style={{ border: '1px solid #7871ff' }}></div>

                        <div className="users-container">
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
                                        <th>Chọn nhân viên giao/nhận hàng</th>
                                    </tr>
                                    {orderReception && orderReception.map((item, index) => {
                                        return (


                                            <tr >
                                                <td>{item.id}</td>
                                                <td>{item.takeAddress}</td>
                                                <td>{item.receiverAddress}</td>
                                                <td>{item.payOption === "P1" ? "Bên gửi" : "Bên nhận"}</td>
                                                <td>{numeral(item.CODCost).format("0,0")}</td>
                                                <td>{numeral(item.fee).format("0,0")}</td>
                                                <td>
                                                    <select onChange={(e) => this.onChangeStaff(e, index)} className='form-control'>
                                                        <option value={''}>Chọn nhân viên giao hàng</option>
                                                        {arrUsers && arrUsers.map((user, index) => {
                                                            if (user.warehouseId === this.state.warehouseId && user.roleId === 'R2') {
                                                                return (
                                                                    <option warehouseId={item.id} value={user.id}>{user.lastName + ' ' + user.firstName}</option>
                                                                )
                                                            }
                                                        })}
                                                    </select>
                                                    <div className='btn-box'>
                                                        <button selectId={this.state.selectedValues[index]} onClick={() => this.handleAcceptOrder(index, item.id)} className='btn-odrcp'>Xác nhận</button>
                                                        <button onClick={() => this.handleViewDetailProduct(item)} className='btn-odrcp'>Xem chi tiết</button>
                                                    </div>


                                                </td>
                                            </tr>

                                        )
                                    })}


                                </tbody>

                            </table>
                        </div>

                    </div>
                </div>
            </div>

        );
    }

}

const mapStateToProps = state => {
    return {
        orderReception: state.admin.orderReception,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrderReceptionStart: () => dispatch(actions.fetchOrderReceptionStart()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OrderReception));
