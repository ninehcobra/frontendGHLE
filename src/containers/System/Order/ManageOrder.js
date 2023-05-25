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
class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            arrProvince: [],
            arrDistrict: [],
            arrNote: [],
            arrPay: [],
            arrProduct: [{
                productImage: '',
                productName: '',
                productId: '',
                productWeight: "0",
                productQuantity: 1,
                productTotalWeight: 0,
            }],
            totalWeight: 0,

        }

    }


    async componentDidMount() {
        await this.getAllProvince()
        await this.props.getNoteStart()
        await this.props.fetchPayStart()
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

    checkValidate = () => {
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
                        toast.warning(`🧐 Missing parameters: ${arrCheck[i]}`)
                        break
                    }
                }
            }
        })




        return isValid
    }



    addProducts = async () => {

        let valid = this.checkValidate()
        let productInfo = {
            productImage: "",
            productName: "",
            productId: "",
            productWeight: '',
            productQuantity: '',
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

    changeTotalWeight = () => {
        let weight = 0;
        let copyState = this.state.arrProduct.map((item, index) => {
            weight = weight + item.productTotalWeight
        })

        this.setState({
            totalWeight: weight
        })
    }

    handleOnChangeImage = async (event, id) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let copyState = this.state.arrProduct.map((item, index) => {
                if (index === id) {
                    return { ...item, productImage: base64 }
                }
                return item
            })
            this.setState({
                arrProduct: copyState
            })
        }
    }

    render() {

        let time = new Date();
        let hours = time.getHours()
        let month = time.getMonth() + 1;
        let timeString = time.getDate() + "-" + month + "-" + time.getFullYear();
        let timeNextDayString = time.getDate() + 1 + "-" + month + "-" + time.getFullYear();

        let arrLength = this.state.arrProduct.length - 1;


        return (
            <div className='manage-order-body mt-3'>
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
                                            <div className='shop-name'>Con cá tra - 0797260870</div>
                                            <div className='shop-address'>Ấp 3 An Phước</div>
                                        </span>
                                        <div className='pick-station'>
                                            <label className='title-pick'>
                                                <span>
                                                    <i className='far fa-square'></i>
                                                    Gửi hàng tại điểm giao nhận GHN
                                                </span>
                                                <span className='note'>
                                                    <i className="fas fa-question-circle fz-12"></i>
                                                </span>
                                            </label>
                                        </div>
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
                                        <select className='form-control'>
                                            {hours + 1 < 12 ? <option id='op-1' >Ca lấy {timeString} (7h00-12h00)</option> : ""}
                                            {hours + 1 < 18 ? <option id='op-2'>Ca lấy {timeString} (12h00-18h00)</option> : ""}
                                            <option id='op-3'>Ca lấy {timeNextDayString} (7h00-12h00)</option>
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
                                <input className='form-control' type='text' placeholder='Nhập số điện thoại'></input>
                                <label>Họ tên</label>
                                <input className='form-control' type='text' placeholder='Nhập họ tên'></input>
                            </div>
                        </div>
                        <div className='col-md-4 offset-md-0'>
                            <div className='deliver-info right'>
                                <div className='info-title'></div>
                                <label>Địa chỉ</label>
                                <input className='form-control' type='text' placeholder='Nhập địa chỉ'></input>
                                <label>Tỉnh-Thành phố</label>
                                <select className='form-control' type='text' onChange={(event) => this.getAllDistrict(event.target.value)}>
                                    <option>Chọn Tỉnh - Thành Phố</option>
                                    {this.state.arrProvince.map((item, index) => {
                                        return (<option value={item.id}>{item.name}</option>)
                                    })}
                                </select>
                                <label>Quận-Huyện</label>
                                <select className='form-control' type='text'>
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
                                                <input onChange={(e) => this.onChangeInputProduct(e.target.value, 'productWeight', index)} value={item.productWeight ? item.productWeight : ""} min="0" type='number' className='mx-1 custom-input form-control'></input>
                                                <div class="package-title">SL</div>
                                                <input onChange={(e) => this.onChangeInputProduct(e.target.value, 'productQuantity', index)} value={item.productQuantity ? item.productQuantity : ''} min="0" type='number' className='mx-1 custom-input form-control'></input>
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
                                    <div className='package-pick-image'>
                                        <div>Up ảnh</div>
                                    </div>
                                    <div className='total-weight mx-1'>
                                        <div className='package-title'>
                                            Tổng KL(gam)                                        </div>
                                        <div className='total-weight-container'>
                                            <input className='custom-input mx-1 form-control' value={this.state.totalWeight}></input>
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
                                    <input className='form-control' disabled value={0}></input>
                                </div>
                                <div className='cost-container'>
                                    <label className='cost-title'>
                                        <span>Tổng giá trị hàng hoá</span>
                                        <span class="note fz-12">Giá trị hàng hoá là gì
                                            <i className="fas fa-question-circle"></i>
                                        </span>
                                    </label>
                                    <input className='form-control' disabled value={0}></input>
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
                                        {" "}- cho khối lượng 500g
                                    </span>
                                </div>
                                <div className='row'>
                                    <div className='col-3'>
                                        <div className='items'>
                                            <div className='check'>
                                                <i class="far fa-circle"></i>
                                            </div>
                                            <div className='info'>
                                                <p style={{ color: "rgb(0, 70, 127)" }}>Chuyển phát thương mại điện tử </p>
                                                <p style={{ color: "rgb(113, 113, 113)" }}>36.001 vnđ</p>
                                                <p style={{ color: "rgb(113, 113, 113)" }}>Ngày giao dự kiến 25/5/2023</p>
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
                                    <select className='form-control'>
                                        {this.state.arrNote && this.state.arrNote.map((item, index) => {
                                            return <option key={index} value={item.key}>{item.valueVi}</option>
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='note-info'>
                                <label className='note-required'>Lưu ý giao hàng
                                    <span>
                                        <i className='fas fa-question-circle fz-12'></i>
                                    </span>
                                </label>
                                <div className='drop-down-select'>
                                    <input className='form-control' placeholder='Nhập mã đơn khách hàng' />
                                </div>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-4 offset-md-0'>
                            <div className='note-info'>
                                <label className='note-required'>Ghi chú
                                </label>
                                <textarea maxlength="500" placeholder="Ví dụ: Lấy sản phẩm 1 2 cái, lấy sản phẩm 2 1 cái" class="form-control" style={{ height: "122px" }}></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='create-form-right'>
                    <div className='create-header'>
                        <div className='create-items'>
                            <span className='create-name'>Gói Chuyển phát thương mại điện tử</span>
                            <span className='create-price'>29.000 vnđ</span>
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
                            <select className='form-control footer-input'>
                                {this.state.arrPay && this.state.arrPay.map((item, index) => {
                                    return <option key={index} value={item.key}>{item.valueVi}</option>
                                })}
                            </select>
                        </div>
                        <div className='info-cost'>
                            <p className='info-cost-label'>Tổng phí</p>
                            <p className='info-cost-detail'>200.000 vnđ</p>
                            <span>Chưa tính tiền thu hộ</span>
                        </div>
                        <div className='button-create-container'>
                            <button onClick={() => this.timenow()} className='button-create'>Tạo đơn</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        note: state.admin.notes,
        pay: state.admin.pays
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getNoteStart: () => dispatch(actions.fetchNoteStart()),
        fetchPayStart: () => dispatch(actions.fetchPayStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);








