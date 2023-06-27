import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../Header.scss'
import { FormattedMessage } from 'react-intl';

import { changeLanguageApp } from '../../../store/actions'



class BannerHeader extends Component {



    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    handleChangeInput = (e) => {
        this.setState({
            orderId: e.target.value
        })
    }

    componentDidMount() {
        // this.interval = setInterval(() => {
        //     this.setState((prevState) => ({
        //         activeIndex: (prevState.activeIndex + 1) % prevState.texts.length,
        //     }));
        // }, 3000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-banner'>
                    <div className='header-banner-img'>

                    </div>
                    <div className='slick-slide-list'>
                        <div className='slide-info'>
                            <p><FormattedMessage id="home-header.slide1-1" /><br /><FormattedMessage id="home-header.slide1-2" /></p>
                        </div>
                        <div className='slide-info'>
                            <p className=""><FormattedMessage id="home-header.slide2-1" /><br /> <FormattedMessage id="home-header.slide2-2" /></p>
                        </div>
                        <div className='slide-info'>
                            <p className=""><FormattedMessage id="home-header.slide3-1" /><br /> <FormattedMessage id="home-header.slide3-2" /></p>
                        </div>
                        <div className='slide-info'>
                            <p className=""><FormattedMessage id="home-header.slide4-1" /><br /><FormattedMessage id="home-header.slide4-2" /></p>
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerHeader);
