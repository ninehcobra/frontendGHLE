import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './Account.scss'
import { getAllDistrictService, getAllProvinceService, getProvinceByDistrict, editUserService } from '../../../../services/userService';
import { toast } from 'react-toastify'
import { persistStore } from 'redux-persist';
import { Redirect } from 'react-router-dom';
import { CommonUtils } from '../../../../utils';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            arrProvince: [],
            arrDistrict: [],
            userProvince: '',
            userDistrict: this.props.userInfo.districtId,
            name: this.props.userInfo.lastName + " " + this.props.userInfo.firstName,
            address: this.props.userInfo.address,
            phoneNumber: this.props.userInfo.phoneNumber,
            image: this.props.userInfo.image,
            isChange: false,
            isChangeImage: false,
        }
    }

    async componentDidMount() {
        await this.getAllProvince()
        let res = await getProvinceByDistrict(
            this.props.userInfo.districtId
        )
        if (res.errCode === 0) {
            await this.setState({
                userProvince: res.provinceId
            })
            this.getAllDistrict(res.provinceId)
        }

    }

    handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                image: base64
            })

        }
        this.setState({
            isChangeImage: true,
            isChange: true
        })
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

    onChangeInput = async (event, id, condition = '') => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
        })
        if (condition === 2) {
            this.setState({
                userDistrict: ''
            })
            await this.getAllDistrict(event.target.value)
        }
        this.setState({
            isChange: true
        })


    }

    checkValidate = (data) => {
        let isValid = true;
        let arrInput = ['id', 'roleid', 'gender', 'phonenumber', 'address', 'districtId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!data[arrInput[i]]) {
                isValid = false
                toast.warning(`Thiếu thông tin : ${arrInput[i]}`)
                break
            }
        }

        return isValid
    }

    handleUpdate = async () => {
        if (this.state.isChange) {
            const chuoi = this.state.name;
            const ten = chuoi.split(' ').pop();
            const ho = chuoi.slice(0, chuoi.lastIndexOf(ten)).trim();


            let data = {
                id: this.props.userInfo.id,
                firstname: ten,
                lastName: ho,
                roleid: this.props.userInfo.roleId,
                gender: this.props.userInfo.gender,
                phonenumber: this.state.phoneNumber,
                address: this.state.address,
                districtId: this.state.userDistrict,

            }

            if (this.props.isChangeImage) {
                data.image = this.props.userInfo.image
            }
            let isValid = this.checkValidate(data)
            if (isValid) {
                try {
                    let res = await editUserService(data)
                    if (res && res.errCode === 0) {
                        let copyUserInfo = this.props.userInfo
                        copyUserInfo.address = data.address
                        copyUserInfo.districtId = data.districtId
                        copyUserInfo.phoneNumber = data.phonenumber
                        copyUserInfo.firstName = ten
                        copyUserInfo.lastName = ho

                        if (this.props.isChangeImage) {
                            copyUserInfo.image = data.image
                        }

                        this.props.updateUser(copyUserInfo)
                        toast.success("Cập nhật thông tin thành công")
                        toast.success("Vui lòng đăng nhập lại để hoàn tất cập nhật!!!")
                    }
                    else {
                        toast.warning(`Lỗi cập nhật trên hệ thống`)
                    }
                } catch (error) {
                    toast.warning(`Lỗi sự cố cập nhật trên hệ thống`)
                }
            }
            else {
                toast.warning(`Lỗi cập nhật trên hệ thống`)
            }
        }
    }

    render() {
        const { processLogout, language, userInfo } = this.props;
        let { userProvince, userDistrict } = this.state
        return (

            <div className="account-container" >
                <div className='breadcrump'>
                    <div className='breadcrump-content'>Trang chủ - thông tin tài khoản</div>
                </div>
                <div className='row body'>
                    <div className='col-sm-12 col-md-4'>
                        <div className='info-title'>| Thông tin cá nhân - ID {userInfo.id}</div>

                        <input id="previewImg" type='file' hidden
                            onChange={(event) => {
                                this.handleOnChangeImage(event)

                            }}
                        />
                        <div className='avatar'>
                            <label htmlFor='previewImg'>
                                <img htmlFor='previewImg' src={this.state.image ? new Buffer(this.state.image, 'base64').toString('binary') : 'https://tse3.mm.bing.net/th?id=OIP.OxiqvM22plgyUpyyxytsrgHaHa&amp;pid=Api&amp;P=0'}></img>
                            </label>

                        </div>

                        <div className='change'>
                            <label className='change-header'>
                                Họ tên
                            </label>

                            <input onChange={(e) => (this.onChangeInput(e, 'name'))} value={this.state.name} type='text' className='form-control'></input>
                            <label className='change-header'>
                                Email
                            </label>
                            <div className='input-disabled'>
                                <input value={userInfo.email} className='form-control' type='text' disabled></input>
                            </div>

                            <label className='change-header'>
                                Số điện thoại
                            </label>

                            <input onChange={(e) => (this.onChangeInput(e, 'phoneNumber'))} value={this.state.phoneNumber} type='text' className='form-control'></input>
                            <label className='change-header'>
                                Mật khẩu
                            </label>

                            <div className='input-disabled'>
                                <input value={"hardcodehehe"} className='form-control' type='password' disabled></input>
                            </div>
                            <div className='forgot'>Đổi mật khẩu?</div>

                            <button onClick={() => this.handleUpdate()} className={this.state.isChange ? 'btn-update btn' : ' btn disable'}>Cập nhật</button>


                        </div>
                    </div>
                    <div className='col-sm-12 col-md-4'>

                        <div className='info-title'>| Thông tin địa chỉ</div>


                        <div className='change' style={{ marginTop: '88px' }}>
                            <label className='change-header'>
                                Địa chỉ
                            </label>

                            <input onChange={(e) => (this.onChangeInput(e, 'address'))} value={this.state.address} type='text' className='form-control'></input>


                            <label className='change-header'>
                                Tỉnh
                            </label>

                            <select className='form-control' value={userProvince ? userProvince : ''} onChange={(e) => (this.onChangeInput(e, 'userProvince', 2))}>
                                {this.state.arrProvince.map((item, index) => {
                                    return (<option value={item.id}>{item.name}</option>)
                                })}
                            </select>
                            <label className='change-header'>
                                Huyện
                            </label>

                            <select className='form-control' value={userDistrict ? userDistrict : ''} onChange={(e) => (this.onChangeInput(e, 'userDistrict'))}>
                                <option value={''}>---Vui lòng chọn Quận/Huyện---</option>
                                {this.state.arrDistrict.map((item, index) => {
                                    return (<option value={item.id}>{item.name}</option>)
                                })}
                            </select>





                        </div>
                    </div>
                </div>


            </div>


        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        updateUser: (userInfo) => dispatch(actions.updateUser(userInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
