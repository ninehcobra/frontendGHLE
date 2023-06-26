import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageOrder.scss'
import { getAllProvinceService } from '../../../services/userService';
import { getAllDistrictService } from '../../../services/userService';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify'
import { languages, CRUD_ACTION, CommonUtils } from '../../../utils';
import { add } from 'lodash';
import { getAddressName } from '../../../services/userService';
import axios from 'axios';
import { getNearestWarehouse } from '../../../services/userService';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

import moment from 'moment';
let numeral = require('numeral');
class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            payGate: '',
            isOpen: false,
            arrProvince: [],
            arrDistrict: [],
            arrNote: [],
            arrPay: [],
            arrProduct: [{
                productImage: '',
                productName: '',
                productId: '',
                productWeight: 0,
                productQuantity: 1,
                productTotalWeight: 0,
            }],
            image: "",
            previewImageURL: '',
            totalWeight: 0,
            CODCost: 0,
            totalCost: 0,
            receivePhone: '',
            receiveName: '',
            receiveAddress: '',
            takeTime: '',
            receiveProvince: '',
            receiveDistrict: '',
            noteOption: '',
            payOption: '',
            fee: '',
            note: '',
            userId: this.props.userInfo.id,
            displayWeight: '',
            isPayed: false
        }

    }


    async componentDidMount() {
        await this.getAllProvince()
        await this.props.getNoteStart()
        await this.props.fetchPayStart()
        await this.props.fetchFeeStart()
    }

    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.note !== this.props.note) {
            this.setState({
                arrNote: this.props.note,
            })
        }
        if (prevProps.pay !== this.props.pay) {
            this.setState({
                arrPay: this.props.pay,
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

    checkProductValidate = () => {
        let isValid = true;
        let arrCheck = [
            'productName',
            'productId',
            'productWeight',
            'productQuantity',
        ]

        this.state.arrProduct.map((item, index) => {
            if (index === this.state.arrProduct.length - 1) {
                for (let i = 0; i < arrCheck.length; i++) {
                    if (!item[arrCheck[i]]) {
                        isValid = false

                        break
                    }
                }
            }
        })




        return isValid
    }



    addProducts = async () => {

        let valid = this.checkProductValidate()

        let productInfo = {
            productImage: "",
            productName: "",
            productId: "",
            productWeight: 0,
            productQuantity: 1,
        }
        if (valid) {

            await this.setState({
                arrProduct: [...this.state.arrProduct, productInfo]
            })

        }



    }

    openPreviewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }

    deleteProducts = (index) => {
        let copyState = this.state.arrProduct
        copyState.splice(index, 1)
        this.setState({
            arrProduct: copyState
        })
        this.changeTotalWeight()
    }

    onChangeInputProduct = async (value, type, id) => {
        let copyState = this.state.arrProduct.map((item, index) => {
            if (index === id) {
                return { ...item, [type]: value }
            }
            return item
        })
        await this.setState({
            arrProduct: copyState
        })
        this.changeTotalProductWeight(id)
    }

    isNumber = (value) => {
        return typeof value === 'number' && isFinite(value);
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
            this.totalFee()
        }
        else {

            let copyState = { ...this.state }
            if (!this.isNumber(event.target.value)) {
                copyState[id] = parseInt(event.target.value.replace(/,/g, ""))
                this.setState({
                    ...copyState
                }, () => {
                })
            }
        }
    }

    changeTotalProductWeight = async (id) => {
        let copyState = this.state.arrProduct.map((item, index) => {
            if (index === id) {

                return { ...item, productTotalWeight: item.productQuantity * item.productWeight }
            }
            return item
        })
        await this.setState({
            arrProduct: copyState
        })
        this.changeTotalWeight()
    }

    changeTotalWeight = async () => {
        let weight = 0;
        let copyState = this.state.arrProduct.map((item, index) => {
            weight = weight + item.productTotalWeight
        })

        await this.setState({
            totalWeight: weight
        })

        this.totalFee()
    }

    calFee = (weight, cost, addCost) => {
        let fee = 0;
        if (weight <= 500) {
            fee = cost;
        }
        else {
            let addWeight = weight - 500
            if (addWeight % 500 !== 0 && addWeight / 500 >= 1) {
                fee = cost + addCost + (addWeight / 500) * addCost
            }
            else if (addWeight % 500 === 0 && addWeight / 500 >= 1) {
                fee = cost + (addWeight / 500) * addCost
            }
            else {
                fee = cost + addCost
            }
        }
        return fee
    }

    totalFee = () => {
        let rec = this.typeAddress(this.state.receiveProvince)
        let sen = this.typeAddress(this.props.userInfo.districtId)
        let weight = this.state.totalWeight
        let fee = 0
        let feeTable = this.props.fee
        if (sen.toString() === 'HN' && rec.toString() === 'HN' || sen.toString() === 'HCM' && rec.toString() === 'HCM' || sen.toString() === 'DN' && rec.toString() === 'DN') {
            console.log("noi tinh")

            feeTable.map((item, index) => {
                if (item.id === 1) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
        else if (sen.toString() === 'HN' && rec.toString() === 'v3' || sen.toString() === 'DN' && rec.toString() === 'v2' || sen.toString() === 'HCM' && rec.toString() === 'v1') {
            console.log("noi vung")

            feeTable.map((item, index) => {
                if (item.id === 2) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
        else if (sen.toString() === 'v3' && rec.toString() === 'v3' || sen.toString() === 'v2' && rec.toString() === 'v2' || sen.toString() === 'v1' && rec.toString() === 'v1') {
            console.log("noi vung tinh")

            feeTable.map((item, index) => {
                if (item.id === 3) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
        else if (sen.toString() === 'HN' && rec.toString() === 'DN' || sen.toString() === 'DN' && rec.toString() === 'HCM' || sen.toString() === 'HCM' && rec.toString() === 'HN'
            || sen.toString() === 'DN' && rec.toString() === 'HN' || sen.toString() === 'HCM' && rec.toString() === 'DN' || sen.toString() === 'HN' && rec.toString() === 'HCM'
        ) {
            console.log("noi vung dac biet")

            feeTable.map((item, index) => {
                if (item.id === 4) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
        else if (sen.toString() === 'HN' && (rec.toString() === 'v1' || rec.toString() === 'v2') || sen.toString() === 'DN' && (rec.toString() === 'v1' || rec.toString() === 'v3') || sen.toString() === 'HCM' && (rec.toString() === 'v2' || rec.toString() === 'v3')) {
            console.log("lien vung")

            feeTable.map((item, index) => {
                if (item.id === 5) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
        else if (sen.toString() === 'v3' && (rec.toString() === 'v1' || rec.toString() === 'v2') || sen.toString() === 'v2' && (rec.toString() === 'v1' || rec.toString() === 'v3') || sen.toString() === 'v1' && (rec.toString() === 'v2' || rec.toString() === 'v3')) {
            console.log("lien vung tinh")

            feeTable.map((item, index) => {
                if (item.id === 6) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
        else {
            feeTable.map((item, index) => {
                if (item.id === 7) {
                    fee = this.calFee(weight, item.cost, item.addCost)
                }
            })
            this.setState({
                fee: fee
            })
        }
    }

    typeAddress = (address) => {
        let type = ''
        let arrAdd1 = [8, 21, 44, 18, 31, 19, 42, 35, 11, 19, 10, 52, 2, 9, 38, 20, 57, 7, 1, 61, 59, 13, 28, 50, 32, 5, 12]
        let arrAdd2 = [47, 33, 46, 56, 49, 45]
        let arrAdd3 = [25, 40, 55, 41, 29, 51, 39, 53, 42, 26, 27, 48, 3, 36, 54, 4, 14, 22, 60, 63, 37, 34, 18, 62, 6, 23, 30]
        arrAdd1.map((item, index) => {
            if (address.toString() === item.toString()) {
                type = 'v1'
            }
        })
        arrAdd2.map((item, index) => {
            if (address.toString() === item.toString()) {
                type = 'v2'
            }
        })
        arrAdd3.map((item, index) => {
            if (address.toString() === item.toString()) {
                type = 'v3'
            }
        })
        if (address.toString() === '58') {
            type = 'HCM'
        }
        if (address.toString() === '15') {
            type = 'DN'
        }
        if (address.toString() === '24') {
            type = 'HN'
        }
        return type
    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageURL: objectUrl,
                image: base64
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

    handleCreateOrder = async () => {
        let isValid = this.checkValidate()
        let coordinatesen = await this.getDistrictCoordinate(this.props.userInfo.districtId)
        let coordinaterec = await this.getDistrictCoordinate(this.state.receiveDistrict)

        let resWarehouse = await getNearestWarehouse(coordinatesen.lat, coordinatesen.lng)
        let resWarehouserec = await getNearestWarehouse(coordinaterec.lat, coordinaterec.lng)

        if (resWarehouse.errCode === 0 && resWarehouserec.errCode === 0) {
            if (isValid) {
                let data = {
                    userId: this.props.userInfo.id,
                    takeName: this.props.userInfo.lastName + " " + this.props.userInfo.firstName,
                    takeAddress: this.props.userInfo.address,
                    takePhone: this.props.userInfo.phoneNumber,
                    takeProvince: '',
                    takeDistrict: this.props.userInfo.districtId,
                    takeTime: this.state.takeTime,
                    receivePhone: this.state.receivePhone,
                    receiverName: this.state.receiveName,
                    receiverAddress: this.state.receiveAddress,
                    receiveProvince: this.state.receiveProvince,
                    receiveDistrict: this.state.receiveDistrict,
                    arrProduct: this.state.arrProduct,
                    imagePackage: this.state.image,
                    totalWeight: this.state.totalWeight,
                    CODCost: this.state.CODCost,
                    totalCost: this.state.totalCost,
                    note: this.state.note,
                    noteOption: this.state.noteOption,
                    fee: this.state.fee,
                    payOption: this.state.isPayed ? 'P3' : this.state.payOption,
                    warehouseId: resWarehouse.warehouseId,
                    recWarehouseId: resWarehouserec.warehouseId
                }

                let res = await this.props.createNewOrder(data)

                if (res && res.errCode === 0) {
                    toast.success('🧐 Create order success!!!')
                }
                else if (!res) {
                    // toast.error(`🧐 Create order Fail!!!`)
                }
            }
            else {
                toast.warning(`🧐 Missing parameters!`)
            }
        }
        else {
            toast.error('🧐 Hiện tại app chưa hỗ trợ giao/lấy hàng tại đây!!!')
        }

    }

    checkValidate = () => {
        let isValid = true
        let arrCheck = ['takeTime', 'receivePhone', 'receiveName', 'receiveAddress', 'receiveProvince', 'receiveDistrict', 'noteOption', 'payOption']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.warning(`🧐 Missing parameters: ${arrCheck[i]}`)
                break
            }
        }

        let arrCheck2 = [
            'productName',
            'productId',
            'productWeight',
            'productQuantity',
        ]
        if (isValid) {
            this.state.arrProduct.map((item, index) => {
                for (let i = 0; i < arrCheck2.length; i++) {
                    if (!item[arrCheck2[i]]) {
                        isValid = false
                        toast.warning(`🧐 Missing parameters in product ${index + 1}: ${arrCheck2[i]}`)
                        break;
                    }
                }
            })

        }

        return isValid
    }

    render() {

        let time = new Date();
        let hours = time.getHours()
        let month = time.getMonth() + 1;
        let timeString = time.getDate() + "-" + month + "-" + time.getFullYear();
        let timeNextDayString = time.getDate() + 1 + "-" + month + "-" + time.getFullYear();
        let timeDeliveryDayString = time.getDate() + 3 + "-" + month + "-" + time.getFullYear();
        let arrLength = this.state.arrProduct.length - 1;


        return (
            <div className='manage-order-body mt-3'>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/numeral.js/2.0.6/numeral.min.js"></script>
                <div className='manage-order-container'>
                    <div className='row'>
                        <div className='row order-info' >
                            <div className='col-md-4 offset-md-2'>
                                <div className='sender-info'>
                                    <div className='info-title'>
                                        | Bên gửi
                                    </div>
                                    <div>
                                        <span>
                                            <div className='shop-name'>{this.props.userInfo.firstName} - {this.props.userInfo.phoneNumber}</div>
                                            <div className='shop-address'>{this.props.userInfo.address}</div>
                                        </span>
                                        {/* <div className='pick-station'>
                                            <label className='title-pick'>
                                                <span>
                                                    <i className='far fa-square'></i>
                                                    Gửi hàng tại điểm giao nhận GHN
                                                </span>
                                                <span className='note'>
                                                    <i className="fas fa-question-circle fz-12"></i>
                                                </span>
                                            </label>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 offset-md-0'>
                                <div className='return-info-check right'>
                                    <div className='title-return'>
                                        <div className='check'>
                                            <i className='far fa-square'></i>
                                            &nbsp;
                                            <div className='text fz-12'>Thêm địa chỉ trả hàng chuyển hoàn</div>
                                            &nbsp;
                                            <i className='fas fa-question-circle fz-12'></i>
                                        </div>
                                    </div>
                                </div>
                                <div className='return-info-check right'>
                                    <label>Chọn ca lấy hàng</label>
                                    <div >
                                        <select onChange={(e) => (this.onChangeInput(e, 'takeTime'))} className='form-control'>
                                            <option value={''}>Chọn ca lấy hàng</option>
                                            {hours + 1 < 12 ? <option value={[timeString, 1]} id='op-1' >Ca lấy {timeString} (7h00-12h00)</option> : ""}
                                            {hours + 1 < 18 ? <option value={[timeString, 2]} id='op-2'>Ca lấy {timeString} (12h00-18h00)</option> : ""}
                                            <option value={[timeNextDayString, 1]} id='op-3'>Ca lấy {timeNextDayString} (7h00-12h00)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2"><hr /></div>
                    <div className='row'>
                        <div className='col-md-4 offset-md-2'>
                            <div className='deliver-info left'>
                                <div className='info-title'> | Bên nhận</div>
                                <label>Số điện thoại</label>
                                <input onChange={(e) => this.onChangeInput(e, 'receivePhone')} value={this.state.receivePhone ? this.state.receivePhone : ''} className='form-control' type='text' placeholder='Nhập số điện thoại'></input>
                                <label>Họ tên</label>
                                <input onChange={(e) => this.onChangeInput(e, 'receiveName')} value={this.state.receiveName ? this.state.receiveName : ''} className='form-control' type='text' placeholder='Nhập họ tên'></input>
                            </div>
                        </div>
                        <div className='col-md-4 offset-md-0'>
                            <div className='deliver-info right'>
                                <div className='info-title'></div>
                                <label>Địa chỉ</label>
                                <input onChange={(e) => this.onChangeInput(e, 'receiveAddress')} value={this.state.receiveAddress ? this.state.receiveAddress : ''} className='form-control' type='text' placeholder='Nhập địa chỉ'></input>
                                <label>Tỉnh-Thành phố</label>
                                <select onChange={(e) => (this.onChangeInput(e, 'receiveProvince', 2))} className='form-control' type='text'>
                                    <option value=''>Chọn Tỉnh - Thành Phố</option>
                                    {this.state.arrProvince.map((item, index) => {
                                        return (<option value={item.id}>{item.name}</option>)
                                    })}
                                </select>
                                <label>Quận-Huyện</label>
                                <select onChange={(e) => (this.onChangeInput(e, 'receiveDistrict'))} className='form-control' type='text'>
                                    <option>Chọn Quận - Huyện</option>
                                    {this.state.arrDistrict.map((item, index) => {
                                        return (<option value={item.id}>{item.name}</option>)
                                    })}
                                </select>
                            </div>

                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2"><hr /></div>
                    <div className='row'>
                        <div className='col-md-8 offset-md-2'>
                            <div className='info-product-title'>
                                | Sản phẩm
                            </div>
                            <div className='list-package' >
                                {this.state.arrProduct && this.state.arrProduct[this.state.arrProduct.length - 1] && this.state.arrProduct.map((item, index) => {
                                    return <div className='package-item'>

                                        <div className='item-name mx-1'>
                                            <div className='block-center'>
                                                <div className='packet-title mr-1'>{index + 1}</div>
                                                <div className='product-input'>
                                                    <input onChange={(e) => this.onChangeInputProduct(e.target.value, 'productName', index)} value={item.productName ? item.productName : ""} type='text' placeholder='Nhập tên sản phẩm' className='custom-input form-control'></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='item-code'>
                                            <input onChange={(e) => this.onChangeInputProduct(e.target.value, 'productId', index)} value={item.productId ? item.productId : ""} type='text' placeholder='Nhập mã sản phẩm' className='custom-input form-control'></input>
                                        </div>
                                        <div className='item-info ml-1'>
                                            <div className='block-center'>
                                                <div class="package-title">KL (gam)</div>
                                                <input onChange={(e) => this.onChangeInputProduct(e.target.value, 'productWeight', index)} value={item.productWeight ? item.productWeight : "0"} min="0" type='number' className='mx-1 custom-input form-control'></input>
                                                <div class="package-title">SL</div>
                                                <input onChange={(e) => this.onChangeInputProduct(e.target.value, 'productQuantity', index)} value={item.productQuantity ? item.productQuantity : '1'} min="0" type='number' className='mx-1 custom-input form-control'></input>
                                                <div className='package-add-icon'>
                                                    {arrLength === index ? <i onClick={() => this.addProducts()} className="fa fa-plus-square"></i> : ''}

                                                </div>
                                                {this.state.arrProduct.length >= 2 ? <div className='package-add-icon'>

                                                    <i onClick={() => this.deleteProducts(index)} className="fas fa-minus-square"></i>
                                                </div> : ""}

                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-8 offset-md-2 packet-full-info' >
                            <div className='info-title'>| Thông tin gói hàng </div>
                            <div className='package-border'>
                                <div className='package-item'>
                                    {this.state.isOpen === true &&
                                        <Lightbox
                                            mainSrc={this.state.previewImageURL}
                                            onCloseRequest={() => this.setState({ isOpen: false })}
                                        />
                                    }
                                    {this.state.previewImageURL ?
                                        <div className='package-pick-image'>
                                            <div className='preview-image'
                                                style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                                onClick={() => { this.openPreviewImage() }}
                                            >

                                            </div>
                                        </div>
                                        :
                                        <div className='package-pick-image'>
                                            <input id="previewImg" type='file' hidden
                                                onChange={(event) => {
                                                    this.handleOnChangeImage(event)

                                                }}
                                            />
                                            <label className='label-upload' htmlFor='previewImg'>Up ảnh</label>
                                        </div>}
                                    <div className='total-weight mx-1'>
                                        <div className='package-title'>
                                            Tổng KL(gam)                                        </div>
                                        <div className='total-weight-container'>
                                            <input disabled className='custom-input mx-1 form-control' value={this.state.totalWeight}></input>
                                        </div>

                                    </div>
                                </div>

                            </div>
                            <div className='cost-form'>
                                <div className='cost-container'>
                                    <label className='cost-title'>
                                        <span>Tổng tiền thu hộ COD </span>
                                        <span class="note fz-12">Thu hộ tiền(COD) là gì
                                            <i className="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input className='form-control' onChange={(e) => this.onChangeInput(e, 'CODCost', 1)} value={this.state.CODCost ? numeral(this.state.CODCost).format('0,0') : 0}></input>
                                </div>
                                <div className='cost-container'>
                                    <label className='cost-title'>
                                        <span>Tổng giá trị hàng hoá</span>
                                        <span class="note fz-12">Giá trị hàng hoá là gì
                                            <i className="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input className='form-control' onChange={(e) => this.onChangeInput(e, 'totalCost', 1)} value={this.state.totalCost ? numeral(this.state.totalCost).format('0,0') : 0}></input>
                                </div>
                            </div>
                            <div className='check-box'>
                                <div className='check-box-container'>
                                    <label>
                                        <label className='check-box-content'>
                                            <input type='checkbox'></input>
                                            <span>Giao thất bại - thu tiền
                                                <i className="fas fa-question-circle"></i>
                                            </span>
                                        </label>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-12 col-md-8 offset-md-2"> <hr /></div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-8 offset-md-2'>
                            <div className='fee-info'>
                                <div className='info-title'>
                                    | Gói cước
                                    <span className='info-title2'>
                                        {" "}- cho khối lượng {this.state.displayWeight ? this.state.displayWeight : '500g'}
                                    </span>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <div className='items'>
                                            <div className='info'>
                                                <p style={{ color: "rgb(0, 70, 127)" }}>Chuyển phát thương mại điện tử </p>
                                                <p style={{ color: "rgb(113, 113, 113)" }}>{numeral(this.state.fee).format('0,0')} vnđ</p>
                                                <p style={{ color: "rgb(113, 113, 113)" }}>Ngày giao dự kiến {timeDeliveryDayString}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="col-md-8 offset-md-2"><hr /></div>
                    <div className='row' style={{ marginBottom: "45px" }} >
                        <div className='col-sm-12 col-md-4 offset-md-2'>
                            <div className='note-info'>
                                <div className='info-title'>| Lưu ý - Ghi chú</div>
                                <label className='note-required'>Lưu ý giao hàng
                                    <span>
                                        <i className='fas fa-question-circle fz-12'></i>
                                    </span>
                                </label>
                                <div className='drop-down-select'>
                                    <select onChange={(e) => (this.onChangeInput(e, 'noteOption'))} className='form-control'>
                                        <option value=''>Chọn lưu ý giao hàng</option>
                                        {this.state.arrNote && this.state.arrNote.map((item, index) => {
                                            return <option key={index} value={item.key}>{item.valueVi}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            {/* <div className='note-info'>
                                <label className='note-required'>Lưu ý giao hàng
                                    <span>
                                        <i className='fas fa-question-circle fz-12'></i>
                                    </span>
                                </label>
                                <div className='drop-down-select'>
                                    <input className='form-control' placeholder='Nhập mã đơn khách hàng' />
                                </div>
                            </div> */}
                        </div>
                        <div className='col-sm-12 col-md-4 offset-md-0'>
                            <div className='note-info'>
                                <label className='note-required'>Ghi chú
                                </label>
                                <textarea onChange={(e) => (this.onChangeInput(e, 'note'))} value={this.state.note ? this.state.note : ""} maxLength="500" placeholder="Ví dụ: Lấy sản phẩm 1 2 cái, lấy sản phẩm 2 1 cái" class="form-control" style={{ height: "122px" }}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='create-form-right'>
                    <div className='create-header'>
                        <div className='create-items'>
                            <span className='create-name'>Gói Chuyển phát thương mại điện tử</span>
                            <span className='create-price'>{numeral(this.state.fee).format('0,0')} vnđ</span>
                        </div>

                        <div className='discount-form'>
                            <div className='hr'></div>
                            <div className='discount-header'>
                                <div>Áp dụng ưu đãi để được giảm giá</div>
                            </div>
                            <div className='discount-body'>
                                <input placeholder='Nhập mã giảm giá' className='form-control input-discount'></input>
                                <button>Áp dụng</button>
                            </div>
                        </div>
                    </div>
                    <div className='create-footer'>
                        <p className='footer-header'>Vui lòng chọn bên trả phí</p>
                        <div className='footer-body'>
                            <select onChange={(e) => (this.onChangeInput(e, 'payOption'))} className='form-control footer-input'>
                                <option value=''>Chọn bên trả phí</option>
                                <option value={'P1'}>Bên gửi trả phí</option>
                                <option value={'P2'}>Bên nhận trả phí</option>

                            </select>
                        </div>

                        {this.state.payOption === 'P1' ?
                            <div style={{ marginTop: '10px' }} className='footer-body'>
                                <select onChange={(e) => (this.onChangeInput(e, 'payGate'))} className='form-control footer-input'>
                                    <option value=''>Hình thức thanh toán</option>
                                    <option value='1'>Trực tuyến</option>
                                    <option value='2'>Giao khi lấy hàng</option>

                                </select>
                            </div> : ''}


                        {this.state.payGate === '1' ?
                            <div style={{ marginTop: '10px', overflow: 'hide', marginBottom: '25px' }}>
                                <PayPalScriptProvider options={{ "client-id": "ATB021v7PNCgCGfG5cYkEJVwGS-SnAWjHCLg8tZnkqk0yMIQWKLSphyh72YpWezyCy3dHXpXG3ZsQejb" }}>
                                    <PayPalButtons disabled={this.checkProductValidate() ? false : true}
                                        createOrder={(data, actions) => {
                                            let value = (this.state.fee / 23000).toFixed(2).toString()

                                            return actions.order.create({
                                                purchase_units: [{
                                                    amount: {
                                                        value: value
                                                    }
                                                }]
                                            })
                                        }}
                                        onApprove={() => {
                                            toast.success('Thanh toán thành công')
                                            this.setState({
                                                isPayed: true
                                            })
                                            setTimeout(() => { this.handleCreateOrder() }, 3000)

                                        }}

                                        onCancel={() => {
                                            // setTimeout(() => { toast.success('Thanh toán thành công') }, 10000)
                                            toast.warning('Thanh toán thất bại')

                                        }}
                                    ></PayPalButtons>
                                </PayPalScriptProvider>
                            </div> : ''

                        }

                        <div className='info-cost'>
                            <p className='info-cost-label'>Tổng phí</p>
                            <p className='info-cost-detail'>{numeral(this.state.fee).format('0,0')} vnđ</p>
                            <span>Chưa tính tiền thu hộ</span>
                        </div>
                        {this.state.payGate === '1' ? "" :
                            <div className='button-create-container'>
                                <button onClick={() => this.handleCreateOrder()} className='button-create'>Lên đơn</button>
                            </div>}

                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        note: state.admin.notes,
        pay: state.admin.pays,
        fee: state.admin.fees,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNoteStart: () => dispatch(actions.fetchNoteStart()),
        fetchPayStart: () => dispatch(actions.fetchPayStart()),
        fetchFeeStart: () => dispatch(actions.fetchFeeStart()),
        createNewOrder: (data) => dispatch(actions.createNewOrder(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);








