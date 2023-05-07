import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { emiiter } from '../../utils/emitter';

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModal: false,
            isOpenModalEditUser: false,
            userEdit: {
            }
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact()
    }

    getAllUsersFromReact = async () => {
        let response = await getAllUsers('All')
        console.log('get user form db', response)
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    handleAddNewUser = () => {
        this.setState({
            isOpenModal: true,
        })
    }

    toggleUserModal = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    toggleEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser,
        })
    }

    createNewUser = async (data) => {
        console.log('check data from child', data)
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.message)
            }
            else {
                await this.getAllUsersFromReact()
                this.setState({
                    isOpenModal: false
                })
                emiiter.emit("EVENT_CLEAR_MODAL_DATA")
            }

        } catch (error) {
            console.log(error)
        }
    }

    handleDeleteUser = async (user) => {
        console.log(user.id)
        try {
            let res = await deleteUserService(user.id)
            if (res && res.errCode === 0) {
                this.getAllUsersFromReact()

            }
            else {
                alert(res.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = async (user) => {
        console.log(user.id)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    doEditUser = async (user) => {
        console.log("click save user", user)

        try {
            let res = await editUserService(user)
            if (res && res.errCode === 0) {
                this.getAllUsersFromReact()
                this.setState({
                    isOpenModalEditUser: false
                })
            }
            else {
                console.log(res.message)
            }
        } catch (error) {
            console.log(error)
        }

    }


    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className="users-container">
                <ModalUser isOpen={this.state.isOpenModal}
                    toggleFromParent={this.toggleUserModal}
                    createNewUser={this.createNewUser}
                />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggleFromParent={this.toggleEditUser}
                        createNewUser={this.createNewUser}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                    />
                }
                <div className='title text-center'>Manage users nienh</div>
                <div className='mx-1'>
                    <button
                        className='btn btn-primary px-3'
                        onClick={() => this.handleAddNewUser()}

                    >
                        <i className='fas fa-plus'></i> Add new user</button>
                </div>
                <table id="customers" className='mt-3 mx-1'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>

                        {arrUsers && arrUsers.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button onClick={() => { this.handleEditUser(item) }} className='btn-edit'><i className='fas fa-pencil-alt'></i></button>
                                        <button onClick={() => { this.handleDeleteUser(item) }} className='btn-delete'><i className='fas fa-trash'></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
