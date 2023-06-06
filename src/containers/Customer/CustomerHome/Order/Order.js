import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './Order.scss'
import notFoundImg from '../../../../assets/notfound.svg'
class Order extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {

    }


    render() {
        const { processLogout, language, userInfo } = this.props;
        return (

            <div class="order-container" >
                <div className='notfound-container'>
                    <img className='image' src={notFoundImg}></img>
                    <div className='notfound-text'>{'Không có đơn hàng hiển thị trong khoảng thời gian từ '}
                        <span className='date'> 22/06/2023 - 06/06/2023</span>
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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Order);
