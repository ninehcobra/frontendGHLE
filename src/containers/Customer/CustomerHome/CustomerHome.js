import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import DetailOrder from '../Order/DetailOrder';
import UserRedux from '../../System/Admin/UserRedux';
import logo from '../../../assets/logo.png'
import { connect } from 'react-redux';
import * as actions from "../../../store/actions";
import { changeLanguageApp } from '../../../store/actions'
import './CustomerHome.scss'
import { Redirect, Switch, withRouter } from 'react-router-dom';
import ManageOrder from '../../System/Order/ManageOrder'
import CustomerManageOrder from './CustomerManageOrder'
import supportImg from '../../../assets/support.png'
import Report from './Report/Report';
import Account from './Account/Account';
import UpdateLater from './UpdateLater/UpdateLater';

class CustomerHome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedButton: 'button1'
        };
    }

    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    handleButtonClick = (buttonId) => {
        this.setState({ selectedButton: buttonId });
    };



    render() {

        const { processLogout, language, userInfo, isLoggedIn } = this.props;


        if (!isLoggedIn) {
            return <Redirect to="/login" />;
        }
        const { selectedButton } = this.state;

        let imageBase64 = ''
        try {
            imageBase64 = new Buffer(userInfo.image, 'base64').toString('binary')
        } catch (error) {

        }
        return (
            <Router>
                <div className='app'>
                    {/* header */}

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
                                        <i className="fas fa-lightbulb shop-witch_icon"></i>

                                    </div>
                                </div>
                                <marquee> <div className="shop-swtich__text">
                                    {"Chào mừng " + userInfo.lastName + ' ' + userInfo.firstName + " đã trở lại!!!"}
                                </div> </marquee>

                            </div>
                            {/* <div className="shop-switch__drop-down-icon-box">
            <i className="fas fa-caret-down shop-switch__drop-down-icon"></i>

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
                                <Link to='/customer/create-order' onClick={() => this.handleButtonClick('button2')} className="btn_header">
                                    <i className="fas fa-pencil-alt">
                                    </i>
                                    <div>
                                        Lên đơn hàng
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="app_header__notification">
                            <a onClick={processLogout} className="notification_icon">
                                <i className="fas fa-sign-out-alt"></i>
                            </a>
                        </div>
                    </div>


                    {/* body*/}
                    <div className='app_body'>
                        <div className="app_body__slidebar">
                            <div>
                                <Link onClick={() => this.handleButtonClick('')} to='/customer/account' style={{ cursor: 'pointer' }}>
                                    <div className="user_info">
                                        <div className="avatar_logo">
                                            <img src={userInfo.image ? imageBase64 : "https://tse3.mm.bing.net/th?id=OIP.OxiqvM22plgyUpyyxytsrgHaHa&amp;pid=Api&amp;P=0"} alt="" className="user_img" />
                                        </div>
                                        <div className="user_name">
                                            <a >
                                                <div >{userInfo.lastName + " " + userInfo.firstName}</div>
                                            </a>
                                            <a >
                                                <div>Chủ cửa hàng
                                                    <i style={{ marginLeft: '5px' }} className="fas fa-user-tie" aria-hidden="true"></i>
                                                </div>

                                            </a>
                                        </div>
                                    </div>
                                </Link>
                                <a href='mailto:giaohangle290302@gmail.com'>
                                    <div className="connect_form">
                                        <div className="connect_form__avatar">
                                            <img src={supportImg} alt="" />
                                        </div>

                                        <div className="connect_form__info">
                                            <div className="info_text1">Hỗ trợ</div>
                                            <div style={{ fontWeight: '600' }} className="info_text2">0797260870</div>


                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div className="slidebar_menu">
                                <div className="slidebar_menu__body">
                                    <Link to="/customer/report">
                                        <div onClick={() => this.handleButtonClick('button1')} className={`button ${selectedButton === 'button1' ? 'activate item_menu' : 'item_menu'}`} >
                                            <i className=" p-r-8 undefined fas fa-chalkboard" aria-hidden="true"></i>
                                            <span className="text_block">Báo cáo - Live</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/order">
                                        <div onClick={() => this.handleButtonClick('button2')} className={`button ${selectedButton === 'button2' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className="  p-r-8 fz-21 fas fa-clipboard-list" aria-hidden="true"></i>
                                            <span className="text_block">Quản lý đơn hàng</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/updating">
                                        <div onClick={() => this.handleButtonClick('button3')} className={`button ${selectedButton === 'button3' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className="  p-r-8 fz-18 far fa-file-excel" aria-hidden="true"></i>
                                            <span className="text_block">Lên đơn Excel</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/updating">
                                        <div onClick={() => this.handleButtonClick('button4')} className={`button ${selectedButton === 'button4' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className=" p-r-8 fz-18 fas fa-store" aria-hidden="true"></i>
                                            <span className="text_block">Quản lý cửa hàng</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/updating">
                                        <div onClick={() => this.handleButtonClick('button5')} className={`button ${selectedButton === 'button5' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className="  p-r-8 fz-17 fas fa-money-check" aria-hidden="true"></i>
                                            <span className="text_block">COD &amp; đối soát</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/updating">
                                        <div onClick={() => this.handleButtonClick('button6')} className={`button ${selectedButton === 'button6' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className="  p-r-8 fz-18 fas fa-exclamation-triangle" aria-hidden="true"></i>
                                            <span className="text_block">Khiếu nại</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/updating">
                                        <div onClick={() => this.handleButtonClick('button7')} className={`button ${selectedButton === 'button7' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className="  p-r-8 fz-18 fas fa-user-cog" aria-hidden="true"></i>
                                            <span className="text_block">Phân quyền</span>
                                        </div>
                                    </Link>
                                    <Link to="/customer/updating">
                                        <div onClick={() => this.handleButtonClick('button8')} className={`button ${selectedButton === 'button8' ? 'activate item_menu' : 'item_menu'}`}>
                                            <i className="   p-r-8 fz-21 fas fa-print" aria-hidden="true"></i>
                                            <span className="text_block">Vận đơn &amp; tiện ích</span>
                                        </div>
                                    </Link>
                                </div>
                                <div className="school-info" >
                                    <a href="">

                                        <div className="text_version">Phiên bản 1.0.0</div>
                                    </a><div className="uit"><a href="">
                                    </a><a href="">
                                            <img src="https://tse4.mm.bing.net/th?id=OIP.j0he3gIN-2KWaBmq-PhqTAAAAA&amp;pid=Api&amp;P=0" alt="" />
                                        </a>
                                    </div>

                                </div>

                            </div>
                        </div>

                        <div className='body_content'>
                            <div className=''>
                                <Route exact path="/customer" component={Report} />
                                <Route path="/customer/account" component={Account} />
                                <Route path="/customer/order" component={CustomerManageOrder} />
                                <Route path="/customer/create-order" component={ManageOrder} />
                                <Route path="/customer/report" component={Report} />
                                <Route path="/customer/updating" component={UpdateLater} />

                            </div>
                        </div>
                    </div>





                    <footer>
                        {/* Footer content */}
                    </footer>
                </div>
            </Router>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerHome);
