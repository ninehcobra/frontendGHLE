import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import '../UserManage.scss'
import { getAllCodeService } from '../../../services/userService';
import { languages } from '../../../utils';
import * as actions from "../../../store/actions"
import './UserRedux.scss'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import TableManageUser from './TableManageUser';
class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genderArr: [],
            roleArr: [],
            previewImageURL: null,
            isOpen: false,

            isUserCreated: true,

            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            role: '',
            image: ''
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getRoleStart()
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
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                image: ''
            })
        }
    }

    handleOnChangeImage = (event) => {
        let data = event.target.files;
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImageURL: objectUrl,
                image: file
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
        })
        this.props.fetchUserRedux()
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
            'role']
        for (let i = 0; i < arrCheck.length; i++) {
            if (!this.state[arrCheck[i]]) {
                isValid = false
                alert('This input is required ' + arrCheck[i])
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
    }



    render() {
        const { language } = this.props
        let { email,
            password,
            firstName,
            lastName,
            phoneNumber,
            address,
            gender,
            role,
            image } = this.state

        console.log(this.state)
        return (
            <div className='user-redux-container'>
                <div className="title text-center" >User Redux</div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'><FormattedMessage id="menu.manage-user.add" /></div>
                            <div className='col-3'>
                                <label>Email</label>
                                <input className='form-control' type='email'
                                    value={email}
                                    onChange={(event) => { this.onChangeInput(event, 'email') }}
                                ></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.password" /></label>
                                <input
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
                            <div className='col-9'>
                                <label><FormattedMessage id="menu.manage-user.address" /></label>
                                <input
                                    value={address}
                                    onChange={(event) => { this.onChangeInput(event, 'address') }} className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.phonenumber" /></label>
                                <input
                                    value={phoneNumber}
                                    onChange={(event) => { this.onChangeInput(event, 'phoneNumber') }} className='form-control' type='text'></input>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="menu.manage-user.gender" /></label>
                                <select id="inputState" class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'gender') }}
                                >

                                    {this.state.genderArr && this.state.genderArr.map((item, index) => {
                                        return <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                    })}

                                </select>
                            </div>
                            <div className='col-6'>
                                <label><FormattedMessage id="menu.manage-user.role-id" /></label>
                                <select id="inputState" class="form-control"
                                    onChange={(event) => { this.onChangeInput(event, 'role') }}>

                                    {this.state.roleArr && this.state.roleArr.map((item, index) => {
                                        return <option key={index} value={item.key}>{language === languages.VI ? item.valueVi : item.valueEn}</option>
                                    })}
                                </select>
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
                                <button className='btn btn-primary'
                                    onClick={() => {
                                        this.handleSaveUser()
                                    }}
                                ><FormattedMessage id="menu.manage-user.save" /></button>

                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser />
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
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart())

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
