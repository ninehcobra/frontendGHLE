import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, transportMenu, WarehouseMenu } from './menuApp';
import './Header.scss';
import { USER_ROLE, languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import logo from '../../assets/logo.png'
import NavigatorCustomer from '../../components/NavigatorCustomer';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuApp: []
        }
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }
    componentDidMount() {
        let { userInfo } = this.props;
        let menu = []
        if (userInfo && !_.isEmpty(userInfo)) {
            let role = userInfo.roleId
            if (role === USER_ROLE.ADMIN) {
                menu = adminMenu
            }

            if (role === USER_ROLE.DELIVERY) {
                menu = transportMenu
            }
            if (role === USER_ROLE.WAREHOUSE) {
                menu = WarehouseMenu
            }


        }
        this.setState({
            menuApp: menu
        })

    }

    render() {

        const { processLogout, language, userInfo } = this.props;
        return (
            <div className={userInfo.roleId && userInfo.roleId === 'R5' ? "app-customer" : "header-container"}>
                {/* thanh navigator */}
                {userInfo.roleId === 'R5' ?

                    <>

                        <div className="app_header">
                            <a href="" className="app_header__brand">
                                <img src={logo} alt="" className="brand-logo" />
                                <div className="brand_text">GIAOHANGLE</div>
                            </a>
                            <button className="button_switch">
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className="app_header__shop-switch">
                                <div className="shop-switch__text-box">
                                    <div className="icon-box">
                                        <div className="shop-witch_icon-box">
                                            <i class="fas fa-lightbulb shop-witch_icon"></i>

                                        </div>
                                    </div>
                                    <marquee> <div className="shop-swtich__text">
                                        {"Chào mừng " + userInfo.lastName + ' ' + userInfo.firstName + " đã trở lại!!!"}
                                    </div> </marquee>

                                </div>
                                {/* <div className="shop-switch__drop-down-icon-box">
                                    <i class="fas fa-caret-down shop-switch__drop-down-icon"></i>

                                </div> */}
                            </div>
                            <div className="app_header__help-icon-box">
                                <i className="fa-solid fa-circle-question app_header__help-icon"></i>
                            </div>
                            <div className="app_header__search">
                                <div className="app_header__search-group">
                                    <div className="search-group__icon">
                                        <button className="btn_search">
                                            <i className="fa fa-search"></i>
                                        </button>
                                    </div>
                                    <input placeholder="Nhập số điện thoại - Mã đơn hàng - Tên người nhận" type="text"
                                        className="form_search" maxLength="60" value="" />
                                </div>
                            </div>
                            <div className="app_header__navbar">
                                <div className="" >
                                    <a href="" className="btn_header">
                                        <i className="fas fa-pencil-alt">
                                        </i>
                                        <div>
                                            Lên đơn hàng
                                        </div>
                                    </a>
                                </div>
                            </div>
                            <div className="app_header__notification">
                                <a onClick={processLogout} className="notification_icon">
                                    <i className="fas fa-sign-out-alt"></i>
                                </a>
                            </div>
                        </div>
                        <div className="header-tabs-container" style={{ marginTop: '64px' }}>
                            <Navigator menus={this.state.menuApp} />
                        </div>

                    </>


                    :
                    <>
                        <div className="header-tabs-container">
                            <Navigator menus={this.state.menuApp} />
                        </div>

                        <div className='welcome'>
                            <marquee><FormattedMessage id="home-header.welcome" /> {userInfo && userInfo.firstName ? userInfo.firstName : ""}!!</marquee>
                            <div className={language === languages.VI ? 'language-vi active' : 'language-vi'}><span onClick={() => this.changeLanguage(languages.VI)}>VN</span></div>
                            <div className={language === languages.EN ? 'language-en active' : 'language-en'}><span onClick={() => this.changeLanguage(languages.EN)}>EN</span></div>
                        </div>

                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </>}

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
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
