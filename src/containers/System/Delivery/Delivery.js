import React, { Component } from 'react';
import { connect } from 'react-redux';
import notAccept from '../../../assets/nonono.webp'
import './Delivery.scss'
import { getUserOrder, getAllCodeService } from '../../../services/userService';
import logo from '../../../assets/logo.png'
import { toast } from 'react-toastify';
import { staffSetOrder } from '../../../services/userService';


class Delivery extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            statusArr: [],
            payArr: [],
            reLoad: 0
        }
    }

    async componentDidMount() {
        let res = await getUserOrder({
            staffId: this.props.userInfo.id
        })
        this.setState({
            orders: res.data
        })

        let status = await getAllCodeService('STATUS')
        this.setState({
            statusArr: status.data
        })

        let pay = await getAllCodeService('PAY')
        this.setState({
            payArr: pay.data
        })
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevState.reLoad !== this.state.reLoad) {
            let res = await getUserOrder({
                staffId: this.props.userInfo.id
            })
            this.setState({
                orders: res.data
            })
        }
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

    onSuccess = async (item) => {
        let res = await staffSetOrder({
            id: item.id,
            status: item.status,
            payOption: item.payOption,
            staffId: item.staffId
        })

        if (res.errCode === 0) {
            toast.success("Xác nhận thành công")
            this.setState({
                reLoad: this.state.reLoad + 1
            })
        }
        else {
            toast.warning("Lỗi server")
        }
    }


    render() {
        let userInfo = this.props.userInfo
        let orders = this.state.orders

        return (
            <>
                {userInfo.warehouseId
                    ?
                    <div className='manageWh-main'>

                        <div className="center">
                            <div className="left">
                                <div className="logo">
                                    <img style={{ width: '100%' }} src={logo}></img>
                                </div>
                                <div style={{ marginTop: '40px' }} className="company">
                                    <div className="company-name">GHLE</div>
                                    <div className="company-description">Nhân viên giao hàng</div>
                                    <div className="company-description">STAFF: <span>{' ' + userInfo.lastName + " " + userInfo.firstName}</span></div>
                                    <div className='ln'></div>
                                </div>
                                <div style={{ marginTop: '10px' }} className="company">
                                    <div className="company-name">Lọc</div>
                                    <select onChange={(e) => this.onChangeSelect(e.target.value)} value={this.state.selectedStaff} style={{ margin: '4px' }} className='form-control'>
                                        <option value={''}>Tất cả</option>

                                    </select>

                                    <div style={{ marginTop: '10px' }} className='ln'></div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="title">Quản lý đơn hàng</div>
                                <div style={{ textAlign: 'center' }} className="description">{`~ngắm nhìn, cảnh sắc đan xen, trăng tròn, khoảnh khắc ban đêm. Chụp lại, xong rồi up, đăng lên, thở dài, đánh mắt sang bên~`}</div>
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
                                            if (item.status === 'S13' || item.status === 'S14' || item.status === 'S4')
                                                return (
                                                    <tr>
                                                        <td>{item.id}</td>
                                                        <td>{item.takeAddress}</td>
                                                        <td>{item.receiverAddress}</td>
                                                        <td>{item.CODCost.toLocaleString('vi-VN')}</td>
                                                        <td>{item.fee.toLocaleString('vi-VN')}</td>
                                                        <td>{this.getStatus(item.status)}</td>
                                                        <td>{this.getPayOption(item.payOption)}</td>
                                                        <td>
                                                            <button onClick={() => this.onSuccess(item)} className={item.status === 'S13' ? 'add-btn' : item.status === 'S14' ? 'add-btn orange' : 'add-btn yellow'}>{item.status === 'S13' ? 'Xác nhận lấy đơn hàng' : item.status === 'S14' ? 'Xác nhận đã lấy hàng thành công' : item.status === 'S4' ? 'Xác nhận giao hàng thành công' : 'Xác nhận nhập về kho thành công'}</button>
                                                        </td>
                                                    </tr>
                                                )
                                        })}


                                    </tbody>

                                </table>

                            </div>
                        </div>


                    </div>
                    :
                    <div className='manageWh-body'>
                        <div className='container'>
                            <div>
                                <img src={notAccept}></img>
                                <div className='manageWh-warn'>Có vẻ như bạn chưa được cấp quyền để giao hàng
                                    <br />
                                    Hoặc có vấn đề ở hệ thống vui lòng liên hệ quản trị viên để được hỗ trợ
                                </div>
                            </div>

                        </div>
                    </div>
                }



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







