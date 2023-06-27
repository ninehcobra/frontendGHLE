import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss'
import { getAllCodeService } from '../../../services/userService';
import { languages, CRUD_ACTION, CommonUtils } from '../../../utils';
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify'
import TableManageUser from './TableManageUser';
import { getAllProvinceService, getAllDistrictService, getProvinceByDistrict } from '../../../services/userService';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sort: '',
            genderArr: [],
            roleArr: [],
            arrProvince: [],
            arrDistrict: [],
            previewImageURL: null,
            isOpen: false,
            userProvince: '',
            userDistrict: '',

            isUserCreated: true,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            image: '',
            action: '',
            userEditId: '',
            districtId: ''
        }
    }

    async componentDidMount() {
        await this.getAllProvince()
        this.props.getGenderStart()
        this.props.getRoleStart()
        await this.getAllProvince()


    }

    componentDidUpdate(prevProps, preState, snapshot) {
        let arrGenders = this.props.gender
        if (prevProps.gender !== this.props.gender) {
            this.setState({
                genderArr: this.props.gender,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : ''
            })
        }

        let arrRoles = this.props.role
        if (prevProps.role !== this.props.role) {
            this.setState({
                roleArr: this.props.role,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : ''
            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGenders = this.props.gender
            let arrRoles = this.props.role
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].key : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].key : '',
                image: '',
                action: CRUD_ACTION.CREATE,
                districtId: '',
                userProvince: '',
                userDistrict: '',

            })
        }
    }

    getUserDistrict = async (districtId) => {
        let res = await getProvinceByDistrict(
            districtId
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
                previewImageURL: objectUrl,
                image: base64
            })
        }
    }

    openPreviewImage = () => {
        if (!this.state.previewImageURL) return;
        this.setState({
            isOpen: true
        })
    }

    handleSaveUser = async () => {
        let isValid = this.checkValidateInput()
        if (isValid === false) return;
        let { action } = this.state

        if (action === CRUD_ACTION.CREATE) {

            //fire redux action

            await this.props.createNewUser({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleid: this.state.role,
                image: this.state.image,
                districtId: this.state.districtId
            })
            this.props.fetchUserRedux()
        }

        else if (action === CRUD_ACTION.EDIT) {
            this.props.editUser({
                id: this.state.userEditId,
                password: this.state.password,
                firstname: this.state.firstName,
                lastname: this.state.lastName,
                address: this.state.address,
                phonenumber: this.state.phoneNumber,
                gender: this.state.gender,
                roleid: this.state.role,
                image: this.state.image,
                districtId: this.state.districtId
            })
        }
    }

    checkValidateInput = () => {
        let isValid = true
        let arrCheck = ['email',
            'password',
            'firstName',
            'lastName',
            'phoneNumber',
            'address',
            'gender',
            'role',
            'districtId']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                toast.warning(`🧐 Missing parameters: ${arrCheck[i]}`)
                break
            }
        }
        return isValid
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
    }

    handleEditUserFromParent = (user) => {
        let imageBase64 = ''
        if (user.image) {

            imageBase64 = new Buffer(user.image, 'base64').toString('binary')
        }
        this.setState({
            email: user.email,
            password: 'HARDCODEHARDCODEHARDCODEHARDCODEHARDCODEHARDCODEHARDCODE',
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            address: user.address,
            gender: user.gender,
            role: user.roleId,
            image: "",
            previewImageURL: imageBase64,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
            userDistrict: user.districtId,
            districtId: user.districtId
        })
        this.getUserDistrict(user.districtId)
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




    render() {
        const { language } = this.props
        const { userDistrict, userProvince } = this.state
        let { email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            role,
            image } = this.state

        return (
            <div className='user-redux-container'>
                <div className="title text-center" >Quản lý người dùng</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><FormattedMessage id="menu.manage-user.add" /></div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.password" /></label>
                                <input
                                    disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                                    value={password}
                                    onChange={(event) => { this.onChangeInput(event, 'password') }}
                                    className='form-control' type='password'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.firstname" /></label>
                                <input
                                    value={firstName}
                                    onChange={(event) => { this.onChangeInput(event, 'firstName') }} className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.lastname" /></label>
                                <input
                                    value={lastName}
                                    onChange={(event) => { this.onChangeInput(event, 'lastName') }} className='form-control' type='text'></input>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.manage-user.address" /></label>
                                <input
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} className='form-control' type='text'></input>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.province" /></label>
                                <select value={userProvince ? userProvince : ''} onChange={(event) => this.onChangeInput(event, 'userProvince')} className='form-control'>
                                    <option value={''}>Chọn Tỉnh/Thành phố</option>
                                    {this.state.arrProvince.map((item, index) => {
                                        return (<option value={item.id}>{item.name}</option>)
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.district" /></label>
                                <select value={userDistrict ? userDistrict : ''} onChange={(event) => { this.onChangeInput(event, 'userDistrict') }} className='form-control'>
                                    <option value={''}>Chọn Quận/Huyện</option>
                                    {this.state.arrDistrict.map((item, index) => {
                                        return (<option value={item.id}>{item.name}</option>)
                                    })}
                                </select>
                            </div>

                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.gender" /></label>
                                <select id="inputState" className="form-control"
                                    value={gender}
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >

                                    {this.state.genderArr && this.state.genderArr.map((item, index) => {
                                        return <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                    })}

                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.role-id" /></label>
                                <select id="inputState" className="form-control"
                                    value={role}
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}>

                                    {this.state.roleArr && this.state.roleArr.map((item, index) => {
                                        return <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                    })}
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.phonenumber" /></label>
                                <input
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id="previewImg" type='file' hidden
                                        onChange={(event) => {
                                            this.handleOnChangeImage(event)

                                        }}
                                    />
                                    <label className='label-upload' htmlFor='previewImg'>Tải ảnh<i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{ backgroundImage: `url(${this.state.previewImageURL})` }}
                                        onClick={() => { this.openPreviewImage() }}
                                    ></div>
                                </div>
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary"}
                                    onClick={() => {
                                        this.handleSaveUser()
                                    }}
                                >{this.state.action === CRUD_ACTION.EDIT ?
                                    <FormattedMessage id="menu.manage-user.edit" /> :
                                    <FormattedMessage id="menu.manage-user.save" />
                                    }   </button>

                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser
                                    handleEditUserFromParent={this.handleEditUserFromParent}
                                    action={this.state.action} />
                            </div>

                        </div>
                    </div>
                </div>

                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.previewImageURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>

        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        gender: state.admin.genders,
        role: state.admin.roles, users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart()),
        createNewUser: (data) => dispatch(actions.createNewUser(data)),
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        editUser: (data) => dispatch(actions.editUser(data)),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
