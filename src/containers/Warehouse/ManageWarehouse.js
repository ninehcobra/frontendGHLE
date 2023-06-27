import React, { Component } from 'react';
import { connect } from 'react-redux';
import notAccept from '../../assets/nonono.webp'
import './ManageWarehouse.scss'
import { getUserOrder, getAllCodeService, getWarehouse, getWarehouseOrder } from '../../services/userService';
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify';



class ManageWarehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            warehouse: [],
            orders: [],
            statusArr: [],
            payArr: [],
            reLoad: 0
        }
    }

    async componentDidMount() {
        let warehouse = await getWarehouse('All')
        warehouse.data.map((item, index) => {
            if (item.staffId === this.props.userInfo.id) {
                this.setState({
                    warehouse: item
                })
            }
        })


        let res = await getWarehouseOrder(this.props.userInfo.warehouseId)
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

    async componentDidUpdate(prevProps, prevState,) {

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

    render() {
        let { userInfo } = this.props
        let { orders, warehouse } = this.state
        return (
            <>
                {this.state.warehouse.id ?

                    <div className='manageWh-main'>

                        <div className="center">
                            <div className="left">
                                <div className="logo">
                                    <img style={{ width: '100%' }} src={logo}></img>
                                </div>
                                <div style={{ marginTop: '40px' }} className="company">
                                    <div className="company-name">GHLE</div>
                                    <div className="company-description">Quản lý Kho</div>
                                    <div className="company-description">STAFF: <span>{' ' + userInfo.lastName + " " + userInfo.firstName}</span></div>
                                    <div className='ln'></div>
                                </div>

                            </div>
                            <div className="right">
                                <div className="title">Quản lý Kho</div>
                                <div style={{ textAlign: 'center' }} className="description">{'~Sắm cho mình một con mắt mới, mở ra đường ta đi sắp tới~'}</div>
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
                                            if (item.status === 'S3' && item.warehouseId === warehouse.id || item.status === 'S15' && item.recWarehouseId === warehouse.id)
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
                                                            <button onClick={() => this.onSuccess(item)} className={item.status === 'S3' ? 'add-btn' : item.status === 'S14' ? 'add-btn orange' : 'add-btn yellow'}>{item.status === 'S3' ? 'Xuất kho' : item.status === 'S14' ? 'Xác nhận đã lấy hàng thành công' : 'Xác nhận nhập về kho thành công'}</button>
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
                                <div className='manageWh-warn'>Có vẻ như bạn chưa được cấp quyền quản lý bất kỳ kho nào
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageWarehouse);







