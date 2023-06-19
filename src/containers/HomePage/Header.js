import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.scss'
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import { useLocation } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { getNew } from '../../services/userService';
import { toast } from 'react-toastify';

class Header extends Component {



    constructor(props) {
        super(props);
        this.state = {
            orderId: '',
            news: [],
            isHovered: false,
            isHoverdService: false,
        }
    }

    async componentDidMount() {
        let news = (await getNew(5)).data
        this.setState({
            news: news
        })
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

    handleKeyPress = (event) => {
        if (event.key === "Enter") {
            // Xử lý logic khi nhấn phím Enter ở đây


            if (event.target.value) {
                this.props.history.push(`/orders/` + event.target.value)
            }

        }
    };

    handleMouseEnter = (cond) => {
        if (cond === 0) { this.setState({ isHovered: true }); }
        else if (cond === 1) { this.setState({ isHoverdService: true }); }

    }

    handleMouseLeave = (cond) => {
        if (cond === 0) { this.setState({ isHovered: false }); }
        else if (cond === 1) { this.setState({ isHoverdService: false }); }
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
                                <a className='link-href' href='/' style={{ textDecoration: 'none' }}>
                                    <div>
                                        <b><FormattedMessage id="home-header.home-name" /></b>
                                    </div>
                                </a>

                                <div></div>
                            </div>
                            <div className='child-content'>
                                <a onMouseEnter={() => this.handleMouseEnter(1)}
                                    onMouseLeave={() => this.handleMouseLeave(1)}
                                    style={{ position: 'relative', textDecoration: 'none' }} className='link-href' >
                                    <div>
                                        <b><FormattedMessage id="home-header.service" /></b>
                                    </div>
                                    {this.state.isHoverdService ?
                                        <div className='menu-service'>
                                            <div className='menu-flex'>
                                                <ul className='menu-list'>
                                                    <li className='menu-item'>
                                                        <a href='/services/dich-vu-giao-hang' className='menu-link'>
                                                            <img className='menu-icon' src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo.png'></img>
                                                            <div className='menu-text'>
                                                                <h3 className='col-text'>GHLE EXPRESS</h3>
                                                                <p>Dịch vụ giao hàng thương mại điện tử, giao nhanh toàn quốc, miễn phí thu hộ COD, miễn phí giao lại, miễn phí trả hàng.</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className='menu-item'>
                                                        <a href='/services/dich-vu-kho-bai' className='menu-link'>
                                                            <img className='menu-icon' src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo.png'></img>
                                                            <div className='menu-text'>
                                                                <h3 className='col-text'>GHLE FULFILLMENT</h3>
                                                                <p>Dịch vụ kho bãi và xử lý hàng hóa, diện tích kho bãi hơn 100.000m2 giúp bạn tối ưu nhu cầu xuất-nhập-tồn kho.</p>
                                                            </div>
                                                        </a>
                                                    </li>

                                                    <li className='menu-item last'>
                                                        <a onClick={() => { toast.success("😎😎😎Sẽ cập nhật trong thời gian tới!!!") }} className='menu-link'>
                                                            <img className='menu-icon' src='https://raw.githubusercontent.com/ninehcobra/free-host-image/main/News/logo.png'></img>
                                                            <div className='menu-text'>
                                                                <h3 className='col-text'>AHAMOVE</h3>
                                                                <p>Dịch vụ giao hàng tức thời 30 phút - 4 giờ trong nội thành Hồ Chí Minh và Hà Nội.</p>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div> :
                                        ''
                                    }

                                </a>
                                <div></div>
                            </div>
                            <div className='child-content'>
                                <a onMouseEnter={() => this.handleMouseEnter(0)}
                                    onMouseLeave={() => this.handleMouseLeave(0)} className='link-href' style={{ textDecoration: 'none' }}>
                                    <div>
                                        <b><FormattedMessage id="home-header.news" /></b>
                                    </div>
                                    {this.state.isHovered ?
                                        <ul className='dropdown-news'>
                                            {this.state.news && this.state.news.map((item, index) => {
                                                return (
                                                    <DropdownItem text={item.header} link={item.id} />
                                                )
                                            })}
                                        </ul> :
                                        ''}

                                </a>

                                <div></div>
                            </div>
                            <div className='child-content'>
                                <a href='https://github.com/ninehcobra/frontendGHLE' className='link-href' style={{ textDecoration: 'none' }}>
                                    <div>
                                        <b><FormattedMessage id="home-header.more-info" /></b>
                                    </div>
                                </a>
                                <div></div>
                            </div>

                        </div>
                        <div className='right-content'>
                            <div>
                                <button onClick={() => this.handleButtonClick()}> <FormattedMessage id="home-header.register-login" /></button>
                            </div>
                            <div className='search-form'>
                                <input onKeyPress={this.handleKeyPress} onChange={(e) => this.handleChangeInput(e)} value={this.state.orderId ? this.state.orderId : ''} placeholder="Nhập mã đơn hàng mà bạn cần tra cứu..."></input>
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

function DropdownItem(item) {
    return (
        <li className='dropdownItem'>
            <a href={`/news/${item.link}`} className='item'>{item.text}</a>
        </li>
    )
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
