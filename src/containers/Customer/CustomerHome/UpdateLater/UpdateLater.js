import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './UpdateLater.scss'
import update from '../../../../assets/images/mechanic.png'

class UpdateLater extends Component {

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
            <div className='update-container'>
                <div className='update-content' >
                    <img className='image' src={update}></img>
                    <div className='update-text'>{'Hệ thống đang được hoàn thiện và ra mắt trong thời gian sắp tới!!'}

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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateLater);
