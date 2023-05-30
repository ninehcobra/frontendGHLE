import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './Warehouse.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { getAllProvinceService } from '../../services/userService';
import { getAllDistrictService } from '../../services/userService';
import { toast } from 'react-toastify'
import { createNewWareHouse } from '../../services/userService';
import { getAddressName } from '../../services/userService';

import axios from 'axios';

class Warehouse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProvince: [],
            arrDistrict: [],
            selectedProvince: '',
            selectedDistrict: '',
            name: '',
            phoneNumber: '',
            address: '',
            addressCoordinate: ''
        }
    }

    async componentDidMount() {
        await this.getAllProvince()




    }

    componentDidUpdate(prevProps, preState, snapshot) {

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
        if (id) {
            let name = await getAddressName(id)
            let nameString = name.districtName + ' ' + name.provinceName
            let res = await axios.get(`https://api.opencagedata.com/geocode/v1/json?key=8eff5dfdb1374a5db3a3415aa2f1747c&q=${nameString}`
            )
            return (res.data.results[0].geometry)
        }

    }


    onChangeInput = async (event, id, condition = '') => {
        if (condition === '') {
            let copyState = { ...this.state }
            copyState[id] = event.target.value
            this.setState({
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
            await this.getAllDistrict(event.target.value)
        }

    }

    handleCreateWareHouse = async () => {
        let coordinate = await this.getDistrictCoordinate(this.state.selectedDistrict)
        console.log(coordinate)
        let isValid = this.checkValidate()
        if (isValid) {

            let data = {
                name: this.state.name,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                districtId: this.state.selectedDistrict,
                addressCoordinate: coordinate
            }

            let res = await createNewWareHouse(data)
            if (res && res.errCode === 0) {
                toast.success(`🧐 Create WareHouse success!!`)
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
            'address'
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


    render() {



        return (
            <div>
                <div className='container mt-4'>

                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label for="inputEmail4">Tên kho</label>
                            <input value={this.state.name} onChange={(e) => (this.onChangeInput(e, 'name'))} type="text" className="form-control" id="inputEmail4" placeholder="Nhập tên kho" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for="inputPassword4">Số điện thoại thường trực kho</label>
                            <input value={this.state.phoneNumber} onChange={(e) => (this.onChangeInput(e, 'phoneNumber'))} type="text" className="form-control" id="inputPassword4" placeholder="Nhập số điện thoại" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className='form-group col-md-6'>
                            <label for="inputAddress">Địa chỉ của kho</label>
                            <input value={this.state.address} onChange={(e) => (this.onChangeInput(e, 'address'))} type="text" className="form-control" id="inputAddress" placeholder="Nhập địa chỉ kho" />
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">Tỉnh/Thành Phố</label>
                            <select onChange={(e) => (this.onChangeInput(e, 'selectedProvince', 2))} id="inputState" className="form-control">
                                <option value={''} selected>Chọn Tỉnh/Thành Phố</option>
                                {this.state.arrProvince.map((item, index) => {
                                    return (<option value={item.id}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label for="inputState">Quận/Huyện</label>
                            <select onChange={(e) => (this.onChangeInput(e, 'selectedDistrict'))} id="inputState" className="form-control">
                                <option selected>Chọn Quận/Huyện</option>
                                {this.state.arrDistrict.map((item, index) => {
                                    return (<option value={item.id}>{item.name}</option>)
                                })}
                            </select>
                        </div>
                    </div>
                    <button onClick={() => this.handleCreateWareHouse()} className="btn btn-primary">Tạo kho</button>

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
