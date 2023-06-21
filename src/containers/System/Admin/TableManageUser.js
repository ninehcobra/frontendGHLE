import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './TableManageUser.scss'
import * as actions from "../../../store/actions"
import { getAllCodeService } from '../../../services/userService';


class TableManageUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sort: '',
            usersRedux: [],
            roleArr: []
        }
    }

    async componentDidMount() {
        this.props.fetchUserRedux()
        let role = await getAllCodeService('ROLE')
        this.setState({
            roleArr: role.data
        })
    }

    componentDidUpdate(prevProps, preState, snapshot) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                usersRedux: this.props.users
            })
        }
    }

    handleDeleteUser = async (user) => {
        await this.props.deleteUser(user.id)
    }

    handleEditUser = async (user) => {
        this.props.handleEditUserFromParent(user)
    }

    getRole = (roleId) => {
        let role = 'Vô danh'
        this.state.roleArr.map((item, index) => {
            if (roleId === item.key) {
                role = item.valueVi
            }
        })
        return role
    }

    onChangeSort = (id) => {
        this.setState({
            sort: id
        })
    }



    render() {
        let arrUsers = this.state.usersRedux
        console.log(this.state.sort)
        return (

            <table id='TableManageUser'  >
                <select onChange={(event) => { this.onChangeSort(event.target.value) }} className='sort-select'>
                    <option value=''>Tất cả</option>
                    <option value='R2'>Nhân viên giao hàng</option>
                    <option value='R3'>Quản lý kho</option>
                    <option value='R5'>Khách hàng</option>
                </select>
                <tbody className='list-user-box'>
                    <tr>
                        <th>Email</th>
                        <th>Role</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Address</th>
                        <th>Actions</th>

                    </tr>

                    {arrUsers && arrUsers.length > 0 &&
                        arrUsers.map((item, index) => {
                            return (

                                this.state.sort === '' ?

                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{this.getRole(item.roleId)}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button
                                                onClick={() => this.handleEditUser(item)}
                                                className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                            <button onClick={() => this.handleDeleteUser(item)} className='btn-delete'><i className='fas fa-trash'></i></button>
                                        </td>
                                    </tr>
                                    :
                                    item.roleId === this.state.sort ?
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{this.getRole(item.roleId)}</td>
                                            <td>{item.firstName}</td>
                                            <td>{item.lastName}</td>
                                            <td>{item.address}</td>
                                            <td>
                                                <button
                                                    onClick={() => this.handleEditUser(item)}
                                                    className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                                <button onClick={() => this.handleDeleteUser(item)} className='btn-delete'><i className='fas fa-trash'></i></button>
                                            </td>
                                        </tr> : ''

                            )
                        })}

                </tbody>

            </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
        deleteUser: (id) => dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
