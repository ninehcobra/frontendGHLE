import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Warehouse.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import { toast } from 'react-toastify'
import { createNewWareHouse } from '../../services/userService';
import {
    getAddressName, getWarehouse, getAllDistrictService, getAllProvinceService, getAllUsers, getProvinceId
    , editWarehouse, deleteWarehouseService
} from '../../services/userService';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import axios from 'axios';

class Warehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            warehouseId: '',
            arrProvince: [],
            arrDistrict: [],
            selectedProvince: '',
            selectedDistrict: '',
            name: '',
            phoneNumber: '',
            address: '',
            addressCoordinate: '',
            arrWarehouses: '',
            arrUsers: '',
            sortId: '',
            staffId: '',

            add: 0,
            isEdit: false
        }
    }

    async componentDidMount() {
        await this.getAllProvince()
        let res = await getWarehouse('All')

        this.setState({
            arrWarehouses: res.data.reverse()
        })
        let users = await getAllUsers('All')
        this.setState({
            arrUsers: users.users
        })

    }

    async componentDidUpdate(prevProps, preState, snapshot) {
        if (preState.name !== this.state.name) {
            let res = await getWarehouse('All')

            this.setState({
                arrWarehouses: res.data.reverse()
            })
            let users = await getAllUsers('All')
            this.setState({
                arrUsers: users.users
            })
        }

        if (preState.add !== this.state.add) {
            let res = await getWarehouse('All')

            this.setState({
                arrWarehouses: res.data.reverse()
            })
            let users = await getAllUsers('All')
            this.setState({
                arrUsers: users.users
            })
        }
    }

    getAllProvince = async () => {
        let response = await getAllProvinceService()
        if (response && response.errCode === 0) {
            this.setState({
                arrProvince: response.data
            })

        }
    }

    getAllDistrict = async (id) => {
        let response = await getAllDistrictService(id)

        if (response && response.errCode === 0) {
            this.setState({
                arrDistrict: []
            })
            this.setState({
                arrDistrict: response.data
            })

        }
    }

    getDistrictCoordinate = async (id) => {
        if (!this.state.isEdit) {
            if (id) {
                let name = await getAddressName(id)
                let nameString = name.districtName + ' ' + name.provinceName
                let res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=8eff5dfdb1374a5db3a3415aa2f1747c&q=${nameString}`
                )
                return (res.data.results[0].geometry)
            }
        }
        else {
            let nameString = this.state.selectedDistrict + ' ' + this.state.selectedProvince
            let res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=8eff5dfdb1374a5db3a3415aa2f1747c&q=${nameString}`
            )
            return (res.data.results[0].geometry)
        }


    }


    onChangeInput = async (event, id, condition = '') => {

        if (condition === '') {
            let copyState = { ...this.state }
            copyState[id] = event.target.value
            await this.setState({
                ...copyState
            }, () => {
            })

        }
        else if (condition === 2) {
            let copyState = { ...this.state }
            copyState[id] = event.target.value
            this.setState({
                ...copyState
            }, () => {
            })
            if (!this.state.isEdit) {
                let provinceId = await (await getProvinceId(event.target.value)).data
                await this.getAllDistrict(provinceId)
            }
            else {
                let provinceId = await (await getProvinceId(event.target.value)).data
                await this.getAllDistrict(provinceId)
            }

        }

    }

    handleCreateWareHouse = async () => {
        let districtId = ''

        if (this.state.arrDistrict) {
            this.state.arrDistrict.map((item, index) => {
                if (item.name === this.state.selectedDistrict) {
                    districtId = item.id
                }
            })
        }

        let coordinate = await this.getDistrictCoordinate(districtId)
        if (this.state.isEdit === false) {
            let isValid = this.checkValidate()
            if (isValid) {

                let data = {
                    name: this.state.name,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    districtId: districtId,
                    addressCoordinate: coordinate,
                    staffId: this.state.staffId
                }

                let res = await createNewWareHouse(data)
                if (res && res.errCode === 0) {
                    toast.success(`🧐 Create WareHouse success!!`)
                    this.setState({
                        name: '',
                        address: '',
                        phoneNumber: '',
                        districtId: '',
                        addressCoordinate: '',
                        staffId: ''
                    })


                }

            }
        }
        else {
            let isValid = this.checkValidate()
            if (isValid) {
                let data = {
                    id: this.state.warehouseId,
                    name: this.state.name,
                    address: this.state.address,
                    phoneNumber: this.state.phoneNumber,
                    districtName: this.state.selectedDistrict,
                    provinceName: this.state.selectedProvince,
                    addressCoordinate: coordinate,
                    staffId: this.state.staffId
                }
                console.log(data)
                let res = await editWarehouse(data)
                if (res.errCode === 0) {
                    toast.success("Cập nhật thông tin kho hàng thành công")
                    this.setState({
                        warehouseId: '',
                        name: '',
                        address: '',
                        phoneNumber: '',
                        selectedDistrict: '',
                        selectedProvince: '',
                        addressCoordinate: '',
                        staffId: '',
                        isEdit: false
                    })
                }
                else {
                    toast.warning("Cập nhật lỗi")
                }
            }
        }
    }

    checkValidate = () => {
        let isValid = true;
        let arrCheck = [
            'selectedProvince',
            'selectedDistrict',
            'name',
            'phoneNumber',
            'address',
            'staffId'
        ]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.warning(`🧐 Missing parameters: ${arrCheck[i]}`)
                break
            }
        }
        return isValid
    }

    formatAddress = (latitude, longitude) => {
        // Tách độ, phút, giây từ chuỗi
        const latParts = latitude.split(/[°'']/);
        const lngParts = longitude.split(/[°'']/);

        // Chuyển đổi sang số decimal
        const latDecimal = parseFloat(latParts[0]) + parseFloat(latParts[1]) / 60 + parseFloat(latParts[2]) / 3600;
        const lngDecimal = parseFloat(lngParts[0]) + parseFloat(lngParts[1]) / 60 + parseFloat(lngParts[2]) / 3600;

        // Làm tròn đến 4 chữ số sau dấu phẩy
        const formattedLat = latDecimal.toFixed(4);
        const formattedLng = lngDecimal.toFixed(4);

        let res = {
            lat: formattedLat,
            lng: formattedLng
        }

        return res
    }

    onChangeSort = (id) => {

        this.setState({
            sortId: id
        })
    }

    handleEditWarehouse = async (item) => {
        let res = await getProvinceId(item.provinceName)
        this.getAllDistrict(res.data)
        this.setState({
            warehouseId: item.id,
            name: item.name,
            address: item.address,
            phoneNumber: item.phoneNumber,
            selectedProvince: item.provinceName,
            selectedDistrict: item.districtName,
            addressCoordinate: '',
            staffId: item.staffId,
            isEdit: true
        })
        console.log('state ne', this.state)

    }

    getStaffName = () => {
        let name = ''
        this.state.arrUsers.map((item, index) => {
            if (item.id === this.state.staffId) {

                name = item.lastName + " " + item.firstName

            }
        })
        return name
    }

    handleDeleteWarehouse = async (id) => {
        let res = await deleteWarehouseService(id)
        if (res && res.errCode !== 0) {
            toast.warning("Xóa kho thất bại")
        }
        else {
            toast.success("Xóa kho thành công")
            this.setState({
                add: this.state.add + 1
            })
        }
    }

    render() {
        console.log(this.state.arrDistrict)
        let { arrWarehouses } = this.state

        return (
            <div>
                <div className='container mt-4'>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Tên kho</label>
                            <input value={this.state.name} onChange={(e) => (this.onChangeInput(e, 'name'))} type="text" className="form-control" id="inputEmail4" placeholder="Nhập tên kho" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputPassword4">Số điện thoại thường trực kho</label>
                            <input value={this.state.phoneNumber} onChange={(e) => (this.onChangeInput(e, 'phoneNumber'))} type="text" className="form-control" id="inputPassword4" placeholder="Nhập số điện thoại" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputPassword4">Quản lý kho</label>
                            <select value={this.state.staffId} onChange={(e) => (this.onChangeInput(e, 'staffId'))} type="text" className="form-control" id="inputPassword4" placeholder="Nhập số điện thoại" >
                                {!this.state.isEdit ? <option value={''}>Chọn nhân viên quản lý</option> : ''}
                                {this.state.isEdit && this.state.staffId ? <option value={parseInt(this.state.staffId)}>{this.getStaffName()}</option> : ''}
                                {this.state.arrUsers && this.state.arrUsers.map((item, index) => {
                                    if (item.roleId === 'R3') {
                                        let isValid = true
                                        this.state.arrWarehouses.map((warehouse, index) => {
                                            if (warehouse.staffId === item.id) {
                                                isValid = false
                                            }
                                        })
                                        if (isValid) {
                                            return (
                                                <option value={item.id}>{item.lastName + ' ' + item.firstName}</option>
                                            )
                                        }
                                    }


                                })}
                            </select>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='form-group col-md-6'>
                            <label for="inputAddress">Địa chỉ của kho</label>
                            <input value={this.state.address} onChange={(e) => (this.onChangeInput(e, 'address'))} type="text" className="form-control" id="inputAddress" placeholder="Nhập địa chỉ kho" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">Tỉnh/Thành Phố</label>
                            <select value={this.state.selectedProvince} onChange={(e) => (this.onChangeInput(e, 'selectedProvince', 2))} id="inputState" className="form-control">
                                <option value={''} >Chọn Tỉnh/Thành Phố</option>
                                {this.state.arrProvince.map((item, index) => {
                                    return (<option value={item.name}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">Quận/Huyện</label>
                            <select value={this.state.selectedDistrict} onChange={(e) => (this.onChangeInput(e, 'selectedDistrict'))} id="inputState" className="form-control">
                                <option >Chọn Quận/Huyện</option>
                                {this.state.arrDistrict.map((item, index) => {
                                    return (<option value={item.name}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <button onClick={() => this.handleCreateWareHouse()} className={this.state.isEdit ? "btn btn-primary btn-yellow" : "btn btn-primary"}>{this.state.isEdit ? 'Lưu chỉnh sửa' : 'Tạo kho'}</button>
                    <table id='TableManageUser'  >
                        <select onChange={(event) => { this.onChangeSort(event.target.value) }} value={this.state.sortId} className='sort-select'>
                            <option value=''>Tất cả</option>
                            {this.state.arrProvince.map((item, index) => {
                                return (<option value={item.name}>{item.name}</option>)
                            })}
                        </select>


                        <tbody className='list-user-box'>
                            <tr>
                                <th>Tên kho</th>
                                <th>Địa chỉ</th>
                                <th>Hotline</th>
                                <th>Tỉnh/Thành phố</th>
                                <th>Quận/huyện</th>
                                <th>Thao tác</th>
                            </tr>

                            {arrWarehouses && arrWarehouses.length > 0 &&
                                arrWarehouses.map((item, index) => {
                                    return (
                                        this.state.sortId === '' ?
                                            <tr>
                                                <td>{item.name}</td>
                                                <td>{item.address}</td>
                                                <td>{item.phoneNumber}</td>
                                                <td>{item.provinceName}</td>
                                                <td>{item.districtName}</td>
                                                <td>
                                                    <button
                                                        onClick={() => this.handleEditWarehouse(item)}
                                                        className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                                    <button onClick={() => this.handleDeleteWarehouse(item.id)} className='btn-delete'><i className='fas fa-trash'></i></button>
                                                </td>
                                            </tr>
                                            : item.provinceName === this.state.sortId ?
                                                <tr>
                                                    <td>{item.name}</td>
                                                    <td>{item.address}</td>
                                                    <td>{item.phoneNumber}</td>
                                                    <td>{item.provinceName}</td>
                                                    <td>{item.districtName}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => this.handleEditWarehouse(item)}
                                                            className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                                        <button onClick={() => this.handleDeleteUser(item)} className='btn-delete'><i className='fas fa-trash'></i></button>
                                                    </td>
                                                </tr> : ''
                                    )
                                })}





                        </tbody>

                    </table>

                </div>
            </div>

        )
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

export default connect(mapStateToProps, mapDispatchToProps)(Warehouse);
