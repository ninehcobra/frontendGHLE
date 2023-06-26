import React, { Component } from 'react';
import { connect } from 'react-redux';
import notAccept from '../../../assets/nonono.webp'
import './Delivery.scss'
import { getUserOrder, getAllCodeService } from '../../../services/userService';
import logo from '../../../assets/logo.png'
import { toast } from 'react-toastify';



class Delivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            statusArr: [],
            payArr: []
        }
    }

    async componentDidMount() {
        let res = await getUserOrder({
            staffId: this.props.userInfo.id
        })
        this.setState({
            orders: res.data
        })
        console.log(res)

        let status = await getAllCodeService('STATUS')
        this.setState({
            statusArr: status.data
        })

        let pay = await getAllCodeService('PAY')
        this.setState({
            payArr: pay.data
        })
    }

    getStatus = (id) => {
        let status = ''
        this.state.statusArr.map((item, index) => {
            if (item.key === id) {
                status = item.valueVi
            }
        })
        return status
    }

    getPayOption = (id) => {
        let pay = ''
        this.state.payArr.map((item, index) => {
            if (item.key === id) {
                pay = item.valueVi
            }
        })
        return pay
    }

    onSuccess = (item, status) => {
        if (status === 'S13') {

        }
    }


    render() {
        let userInfo = this.props.userInfo
        let orders = this.state.orders

        return (
            <>

                <div className='manageWh-main'>

                    <div class="center">
                        <div class="left">
                            <div class="logo">
                                <img style={{ width: '100%' }} src={logo}></img>
                            </div>
                            <div style={{ marginTop: '40px' }} class="company">
                                <div class="company-name">GHLE</div>
                                <div class="company-description">Nhân viên giao hàng</div>
                                <div class="company-description">STAFF: <span>{' ' + userInfo.lastName + " " + userInfo.firstName}</span></div>
                                <div className='ln'></div>
                            </div>
                            <div style={{ marginTop: '10px' }} class="company">
                                <div class="company-name">Lọc</div>
                                <select onChange={(e) => this.onChangeSelect(e.target.value)} value={this.state.selectedStaff} style={{ margin: '4px' }} className='form-control'>
                                    <option value={''}>Tất cả</option>

                                </select>

                                <div style={{ marginTop: '10px' }} className='ln'></div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="title">Quản lý đơn hàng</div>
                            <div style={{ textAlign: 'center' }} class="description">{`~ngắm nhìn, cảnh sắc đan xen, trăng tròn, khoảnh khắc ban đêm. Chụp lại, xong rồi up, đăng lên, thở dài, đánh mắt sang bên~`}</div>
                            <div style={{ border: '1px solid #7871ff' }}></div>

                            <table style={{ marginTop: '20px' }} id='TableManageUser'  >

                                <tbody className='list-user-box'>
                                    <tr>
                                        <th>Mã đơn hàng</th>
                                        <th>Địa chỉ lấy hàng</th>
                                        <th>Địa chỉ giao hàng</th>
                                        <th>COD - Thu hộ</th>
                                        <th>Phí giao hàng</th>
                                        <th>Tình trạng đơn hàng</th>
                                        <th>Tình trạng thanh toán</th>
                                        <th>Thao tác</th>
                                    </tr>

                                    {orders && orders.map((item, index) => {
                                        return (
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>{item.takeAddress}</td>
                                                <td>{item.receiverAddress}</td>
                                                <td>{item.CODCost}</td>
                                                <td>{item.fee}</td>
                                                <td>{this.getStatus(item.status)}</td>
                                                <td>{this.getPayOption(item.payOption)}</td>
                                                <td>
                                                    <button onClick={() => this.onSuccess(item, item.status)} className='add-btn'>{item.status === 'S13' ? 'Xác nhận lấy thành công' : 'Xác nhận giao thành công'}</button>
                                                </td>
                                            </tr>
                                        )
                                    })}


                                </tbody>

                            </table>

                        </div>
                    </div>


                </div>

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Delivery);







