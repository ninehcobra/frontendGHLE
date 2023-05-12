import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'



class Header extends Component {
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-container sticky-header'>
                    <div className='home-header-content'>
                        <div className='left-content'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>

                        </div>
                        <div className='center-content'>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.home-name" /></b>
                                </div>
                                <div></div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.service" /></b>
                                </div>
                                <div></div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.news" /></b>
                                </div>
                                <div></div>
                            </div>
                            <div className='child-content'>
                                <div>
                                    <b><FormattedMessage id="home-header.more-info" /></b>
                                </div>
                                <div></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div>
                                <button> <FormattedMessage id="home-header.register-login" /></button>
                            </div>
                            <div className='search-form'>
                                <input placeholder="Nhập mã đơn hàng mà bạn cần tra cứu..."></input>
                                <i className="fas fa-search"></i>
                            </div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                        </div>
                    </div>
                </div>
                <div className='home-header-banner'>
                    <div className='header-banner-img'>

                    </div>
                    <div className='slick-slide-list'>
                        <div className='slide-info'>
                            <p><FormattedMessage id="home-header.slide1-1" /><br /><FormattedMessage id="home-header.slide1-2" /></p>
                        </div>
                        <div className='slide-info'>
                            <p class=""><FormattedMessage id="home-header.slide2-1" /><br /> <FormattedMessage id="home-header.slide2-2" /></p>
                        </div>
                        <div className='slide-info'>
                            <p class=""><FormattedMessage id="home-header.slide3-1" /><br /> <FormattedMessage id="home-header.slide3-2" /></p>
                        </div>
                        <div className='slide-info'>
                            <p class=""><FormattedMessage id="home-header.slide4-1" /><br /><FormattedMessage id="home-header.slide4-2" /></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
