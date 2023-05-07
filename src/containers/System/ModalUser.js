import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { emiiter } from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
            address: "",
            phonenumber: "",
            gender: "1",
            roleid: "R1",
        }

        this.listenToEmiiter();
    }

    listenToEmiiter() {
        emiiter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({
                email: "",
                password: "",
                firstname: "",
                lastname: "",
                address: "",
                phonenumber: "",
                gender: "1",
                roleid: "R1",
            })
        })
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggleFromParent()
    }

    handleOnchange = (event, id) => {
        let copystate = { ...this.state }
        copystate[id] = event.target.value
        this.setState({
            ...copystate
        })
    }

    checkValidate = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstname', 'lastname', 'address', 'phonenumber']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert('Missing parameter: ' + arrInput[i])
                break
            }
        }

        return isValid
    }

    handleAddNewUser = () => {
        let isValid = this.checkValidate()
        if (isValid === true) {
            this.props.createNewUser(this.state)
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className='modal-user-container'
                size='lg'
                centered>
                <ModalHeader toggle={() => { this.toggle() }}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-col'>
                            <div className='input-container'>
                                <label>Email</label>
                                <input type='email' onChange={(event) => { this.handleOnchange(event, 'email') }}
                                    value={this.state.email} />
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <input type='password' onChange={(event) => { this.handleOnchange(event, 'password') }}
                                    value={this.state.password} />
                            </div>
                            <div className='input-container'>
                                <label>First name</label>
                                <input type='text' onChange={(event) => { this.handleOnchange(event, 'firstname') }}
                                    value={this.state.firstname} />
                            </div>
                            <div className='input-container'>
                                <label>Last name</label>
                                <input type='text' onChange={(event) => { this.handleOnchange(event, 'lastname') }}
                                    value={this.state.lastname} />
                            </div>
                        </div>
                        <div className='input-col'>
                            <div className='input-container'>
                                <label>Address</label>
                                <input type='text' onChange={(event) => { this.handleOnchange(event, 'address') }}
                                    value={this.state.address} />
                            </div>
                            <div className='input-container'>
                                <label>Phone number</label>
                                <input type='text' onChange={(event) => { this.handleOnchange(event, 'phonenumber') }}
                                    value={this.state.phonenumber} />
                            </div>
                            <div className='input-container'>
                                <label>Gender</label>
                                <select>
                                    <option>
                                        Male
                                    </option>
                                    <option>
                                        Female
                                    </option>
                                </select>
                            </div>
                            <div className='input-container'>
                                <label>Password</label>
                                <select>
                                    <option>
                                        Admin
                                    </option>
                                    <option>
                                        Staff
                                    </option>
                                    <option>
                                        Store
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button
                        style={{ padding: "0 10px" }}
                        color="primary"
                        onClick={() => { this.handleAddNewUser() }}>
                        Create
                    </Button>{' '}
                    <Button style={{ padding: "0 10px" }} color="secondary" onClick={() => { this.toggle() }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);








