import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import BannerSlick from './Section/BannerSlick';
import Map from './Section/Map';
import Partner from './Section/Partner';
import HomeFooter from './HomeFooter';

class HomePage extends Component {

    render() {


        return (
            <div>
                <Header></Header>
                <BannerSlick></BannerSlick>
                <Map></Map>
                <Partner></Partner>
                <HomeFooter></HomeFooter>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
