import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import { toast } from 'react-toastify'
import './Register.scss';
import { FormattedMessage } from 'react-intl';
import { handleLoginApi } from '../../services/userService';
import img from '../../../src/assets/login.png'
import logo from '../../../src/assets/logo-giaohangle.png'
import { getAllProvinceService, getAllDistrictService, getProvinceByDistrict } from '../../services/userService';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowPassword: false,
            isRegister: false,
            errMessage: '',


            arrProvince: [],
            arrDistrict: [],
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: 'G1',
            role: 'R5',
            userProvince: '',
            userDistrict: '',
            fullname: ''
        }
    }

    async componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown)
        await this.getAllProvince()
    }

    getAllProvince = async () => {
        let response = await getAllProvinceService()
        if (response && response.errCode === 0) {
            this.setState({
                arrProvince: response.data
            })

        }
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // Xử lý logic khi nhấn phím Enter ở đây
            this.handleRegister()
        }
    };






    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    onChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        }, () => {
        })
        if (id === 'userProvince') {
            this.getAllDistrict(event.target.value)
        }
        else if (id === 'userDistrict') {
            this.setState({
                districtId: event.target.value
            })
        }
        else if (id === 'fullname') {
            const chuoi = event.target.value
            const ten = chuoi.split(' ').pop();
            const ho = chuoi.slice(0, chuoi.lastIndexOf(ten)).trim();

            this.setState({
                firstName: ten,
                lastName: ho,
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

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email',
            'password',
            'fullname',
            'phoneNumber',
            'address',
            'gender',
            'role',
            'userProvince',
            'userDistrict',]
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.warning(`🧐 Missing parameters: ${arrCheck[i]}`)
                break
            }
        }
        return isValid
    }

    handleRegister = async () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            let register = await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleid: this.state.role,
                districtId: this.state.districtId
            })
            if (register) {
                this.setState({
                    isRegister: true
                })
            }

        }
    }

    render() {
        console.log(this.state)
        let { email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            role, fullname
        } = this.state


        return (
            <div className='login-container'>
                <div className='row'>
                    <div className='left-content'>
                        <div className='background-left'>
                            <img src={img} className='img'></img>
                            <div className='logo-school'>
                                <img src='https://tse4.mm.bing.net/th?id=OIP.RopD45u-y2SjLUw0x5loNAHaI2&pid=Api&P=0&h=180'></img>
                            </div>
                            <div className='content-note'>
                                <img src={logo}></img>
                                <div className='left-row2'>
                                    THIẾT KẾ CHO GIẢI PHÁP GIAO NHẬN HÀNG
                                    <br />
                                    TỐT NHẤT TỪ TRƯỚC ĐẾN NAY
                                </div>
                                <div className='left-row3'>Nhanh hơn, rẻ hơn và thông minh hơn</div>
                            </div>
                            <div className='backdrop'></div>
                        </div>
                    </div>
                    <div className='right-content'>
                        <div className='form-content'>
                            <div className='login-content'>
                                <div className='title-login'>
                                    <span className='login-row-1'>{!this.state.isRegister ? 'TẠO TÀI KHOẢN GHLE' : 'CHÚC MỪNG BẠN ĐÃ TẠO TÀI KHOẢN THÀNH CÔNG'}</span>
                                    <p className='login-row-2'>{!this.state.isRegister ? 'GHLE luôn đồng hành cùng bạn' : 'GHLE luôn sẵn sàng hỗ trợ bạn mọi lúc khi cần!'}</p>
                                </div>
                                {!this.state.isRegister ? <div className='login-form'>

                                    <div className='row'>
                                        <div className='col-1'></div>
                                        <div className='col-5'>
                                            <div className='form-group'>
                                                <label>Email</label>
                                                <input value={email} onChange={(event) => { this.onChangeInput(event, 'email') }} placeholder='Nhập email' className='form-control'></input>
                                                <p></p>
                                            </div>

                                            <div className='form-group'>
                                                <label>Mật khẩu</label>
                                                <input value={password}
                                                    type='password' onChange={(event) => { this.onChangeInput(event, 'password') }} placeholder='Nhập mật khẩu' className='form-control'></input>
                                                <p></p>
                                            </div>

                                            <div className='form-group'>
                                                <label>Họ và tên</label>
                                                <input value={fullname}
                                                    onChange={(event) => { this.onChangeInput(event, 'fullname') }} placeholder='Tên đầy đủ' className='form-control'></input>
                                                <p></p>
                                            </div>

                                            <div className='form-group'>
                                                <label>Địa chỉ</label>
                                                <input value={address}
                                                    onChange={(event) => { this.onChangeInput(event, 'address') }} placeholder='Nhập địa chỉ cụ thể' className='form-control'></input>
                                                <p></p>
                                            </div>

                                        </div>
                                        <div className='col-5'>
                                            <div className='form-group'>
                                                <label>Tỉnh/Thành phố</label>
                                                <select onChange={(event) => this.onChangeInput(event, 'userProvince')} className='form-control'>
                                                    <option value=''>Chọn Tỉnh/Thành phố</option>
                                                    {this.state.arrProvince.map((item, index) => {
                                                        return (<option value={item.id}>{item.name}</option>)
                                                    })}
                                                </select>
                                                <p></p>
                                            </div>

                                            <div className='form-group'>
                                                <label>Quận/Huyện</label>
                                                <select onChange={(event) => { this.onChangeInput(event, 'userDistrict') }} className='form-control'>
                                                    <option value=''>Chọn Quận/Huyện</option>
                                                    {this.state.arrDistrict.map((item, index) => {
                                                        return (<option value={item.id}>{item.name}</option>)
                                                    })}
                                                </select>
                                                <p></p>
                                            </div>

                                            <div className='form-group'>
                                                <label>Giới tính</label>
                                                <select value={gender}
                                                    onChange={(event) => { this.onChangeInput(event, 'gender') }} className='form-control'>
                                                    <option value='G1'>Nam</option>
                                                    <option value='G2'>Nữ</option>
                                                    <option value='G3'>Khác</option>
                                                </select>
                                                <p></p>
                                            </div>

                                            <div className='form-group'>
                                                <label>Số điện thoại</label>
                                                <input value={phoneNumber}
                                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} placeholder='Nhập số điện thoại di động' className='form-control'></input>
                                                <p></p>
                                            </div>
                                        </div>
                                        <div className='col-1'></div>
                                    </div>
                                    <div className='register-row-4 row'>
                                        <div className='content-register'>
                                            <div className='form-group'>
                                                <div>Bằng việc nhấn "Đăng ký", bạn đồng ý với
                                                    <br />
                                                    <a style={{ float: 'none' }}> Điều khoản dịch vụ</a>
                                                    {' và '}
                                                    <a style={{ float: 'none' }}>Quy định Riêng tư Cá nhân</a>
                                                    {' của chúng tôi'}
                                                </div>
                                                <button onClick={this.handleRegister} className='register-button'>Đăng ký</button>
                                            </div>

                                            <div className='register-row-3'>
                                                <label className="">{'Bạn đã có tài khoản? '}</label>
                                                <a href='/login' style={{ color: '#ff6339', textDecoration: 'none' }}> <span>Đăng nhập ngay</span></a>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                    : <div className='login-form'>
                                        <div className='register-row-4 row'>
                                            <div className='content-register'>


                                                <div className='register-row-3'>
                                                    <label className="">{'Quay về trang đăng nhập '}</label>
                                                    <a href='/login' style={{ color: '#ff6339', textDecoration: 'none' }}> <span>tại đây</span></a>
                                                </div>
                                            </div>

                                        </div> </div>}

                            </div>
                        </div>
                    </div>
                    <a href='/home'>   <div className='button-home'>Về trang chủ</div></a>



                </div>

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        // userLoginFail: () => dispatch(actions.userLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
