import React, { Component } from 'react';
import { connect } from 'react-redux';
import notAccept from '../../assets/nonono.webp'
import './ManageDeliveryStaff.scss'
import { getWarehouse, getAllUsers, editUserService, getStaffHistory } from '../../services/userService';
import logo from '../../assets/logo.png'
import { toast } from 'react-toastify';



class ManageDeliveryStaff extends Component {

    constructor(props) {
        super(props);
        this.state = {
            warehouse: '',
            arrUsers: [],
            selectedStaff: '',
            isDeleted: false,
            history: []
        }
    }

    async componentDidMount() {
        let res = await getWarehouse('All')
        res.data.map((item, index) => {
            if (item.staffId === this.props.userInfo.id) {
                this.setState({
                    warehouse: item
                })
            }
        })

        let user = await getAllUsers('All')
        this.setState({
            arrUsers: user.users
        })

        let history = await getStaffHistory('All')
        this.setState({
            history: history.data
        })
    }

    async componentDidUpdate(prevProps, prevState,) {
        if (prevState.selectedStaff !== this.state.selectedStaff) {
            let user = await getAllUsers('All')
            this.setState({
                arrUsers: user.users
            })
        }

        if (prevState.isDeleted !== this.state.isDeleted) {
            let user = await getAllUsers('All')
            this.setState({
                arrUsers: user.users
            })
        }
    }

    onChangeSelect = (id) => {
        this.setState({
            selectedStaff: id
        })
    }

    handleAddUser = async () => {
        if (this.state.selectedStaff) {
            let dataUser = {}
            this.state.arrUsers.map((item, index) => {

                if (item.id.toString() === this.state.selectedStaff) {
                    dataUser = item
                }
            })

            if (dataUser) {
                let data = {
                    id: dataUser.id,
                    roleid: dataUser.roleId,
                    gender: dataUser.gender,
                    phonenumber: dataUser.phoneNumber,
                    warehouseId: this.state.warehouse.id
                }

                let res = await editUserService(data)
                if (res && res.errCode === 0) {
                    toast.success('them thanh cong')
                    this.setState({
                        selectedStaff: ''
                    })
                }
                else {
                    toast.warning('them that bai')
                }
            }
        }
        else {
            toast.warning('Chưa chọn nhân viên')
        }
    }

    handleDeleteUser = async (id) => {
        if (id) {
            let dataUser = {}
            this.state.arrUsers.map((item, index) => {
                if (item.id === id) {
                    dataUser = item
                }
            })

            if (dataUser) {
                let data = {
                    id: dataUser.id,
                    roleid: dataUser.roleId,
                    gender: dataUser.gender,
                    phonenumber: dataUser.phoneNumber,
                    warehouseId: -1
                }

                let res = await editUserService(data)
                if (res && res.errCode === 0) {
                    toast.success('Sa thải thành công')
                    this.setState({
                        isDeleted: !this.state.isDeleted
                    })
                }
                else {
                    toast.warning('Sa thải thất bại')
                }
            }
        }

    }

    countOrder = (id) => {
        let history = this.state.history
        let count = 0
        let countDone = 0
        history.map((item, index) => {
            if (item.staffId === id && item.orderStatus === 'Đã tiếp nhận') {
                count = count + 1
            }
        })
        history.map((item, index) => {
            if (item.staffId === id && item.orderStatus.split(' ').slice(0, 3).join(' ') === 'Đã giao đến') {
                countDone = countDone + 1
            }
        })
        return {
            countProcess: count - countDone,
            countDone: countDone,
            countTotal: count
        }
    }

    render() {
        let { userInfo } = this.props
        let arrUsers = this.state.arrUsers
        console.log(this.state.arrUsers)
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
                                    <div className="company-description">Quản lý nhân sự kho</div>
                                    <div className="company-description">STAFF: <span>{' ' + userInfo.lastName + " " + userInfo.firstName}</span></div>
                                    <div className='ln'></div>
                                </div>
                                <div style={{ marginTop: '10px' }} className="company">
                                    <div className="company-name">Thêm nhân viên</div>
                                    <select onChange={(e) => this.onChangeSelect(e.target.value)} value={this.state.selectedStaff} style={{ margin: '4px' }} className='form-control'>
                                        <option value={''}>Chọn nhân viên</option>
                                        {arrUsers.map((item, index) => {
                                            if (item.roleId === 'R2' && !item.warehouseId) {
                                                return (<option value={item.id}>{item.lastName + ' ' + item.firstName}</option>)

                                            }
                                        }
                                        )
                                        }
                                    </select>

                                    <button onClick={() => this.handleAddUser()} className='add-btn'>Thêm</button>

                                    <div style={{ marginTop: '10px' }} className='ln'></div>
                                </div>
                            </div>
                            <div className="right">
                                <div className="title">Quản lý nhân sự kho</div>
                                <div style={{ textAlign: 'center' }} className="description">{'~Sắm cho mình một con mắt mới, mở ra đường ta đi sắp tới~'}</div>
                                <div style={{ border: '1px solid #7871ff' }}></div>

                                <table style={{ marginTop: '20px' }} id='TableManageUser'  >

                                    <tbody className='list-user-box'>
                                        <tr>
                                            <th>Tên</th>
                                            <th>Email</th>
                                            <th>Số điện thoại</th>
                                            <th>Số đơn đang nhận</th>
                                            <th>Số đơn đã giao / nhập</th>
                                            <th>Tổng đơn</th>
                                            <th>Sa thải</th>

                                        </tr>

                                        {arrUsers && arrUsers.length > 0 &&
                                            arrUsers.map((item, index) => {
                                                if (item.roleId === 'R2' && item.warehouseId === this.state.warehouse.id) {
                                                    return (
                                                        <tr>
                                                            <td>{item.lastName + ' ' + item.firstName}</td>
                                                            <td>{item.email}</td>
                                                            <td>{item.phoneNumber}</td>
                                                            <td>{this.countOrder(item.id).countProcess}</td>
                                                            <td>{this.countOrder(item.id).countDone}</td>
                                                            <td>{this.countOrder(item.id).countTotal}</td>
                                                            <td>

                                                                <button onClick={() => this.handleDeleteUser(item.id)} className='btn-delete'><i className='fas fa-trash'></i></button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }

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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDeliveryStaff);







