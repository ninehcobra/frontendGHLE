import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn, userInfo } = this.props;
        let linkToRedirect = isLoggedIn ? '/system/manage-order' : '/home';

        // if (isLoggedIn) {
        //     if (userInfo.roleId === 'R5') {
        //         linkToRedirect = '/testing'
        //     }
        //     else {
        //         linkToRedirect = '/system/user-redux'
        //     }
        // }
        // else {

        //     linkToRedirect = '/home'

        // }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
