import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class Header extends Component {



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

    handleButtonClick = () => {
        const { history } = this.props;
        // Điều hướng qua link khác
        history.push('/login');
    };

    render() {
        let language = this.props.language

        return (
            <React.Fragment>
                <div className='home-header-container sticky-header'>
                    <div className='home-header-content'>
                        <div className='left-content'>
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
                                <button onClick={() => this.handleButtonClick()}> <FormattedMessage id="home-header.register-login" /></button>
                            </div>
                            <div className='search-form'>
                                <input onChange={(e) => this.handleChangeInput(e)} value={this.state.orderId ? this.state.orderId : ''} placeholder="Nhập mã đơn hàng mà bạn cần tra cứu..."></input>
                                <a href={'/orders/' + this.state.orderId}>
                                    <i className="fas fa-search" style={{ cursor: 'pointer' }}></i>
                                </a>
                            </div>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
