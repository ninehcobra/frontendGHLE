import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './BannerSlick.scss';
import { FormattedMessage } from 'react-intl';
import icon1 from '../../../assets/images/icon1.webp'
import icon2 from '../../../assets/images/icon2.webp'
import icon3 from '../../../assets/images/icon3.webp'
import icon4 from '../../../assets/images/icon4.webp'


class BannerSlick extends Component {


    render() {
        return (
            <>
                <div className='section-banner'>
                    <div className='banner-content'>
                        <div className='text-center'>
                            <h2><FormattedMessage id="home-header.section-h2" /></h2>
                            <p><FormattedMessage id="home-header.section-p" /></p>
                        </div>

                        <img src='https://file.hstatic.net/200000472237/file/ghn-01_a87802ad3cbf418694160e824b9fd798.jpg'>
                        </img>
                    </div>
                </div>
                <div className='section-icon'>
                    <div className='icon-content'>
                        <div className='row'>
                            <div className="col-md-3 col-sm-6 col-xs-6 ">
                                <div className="container">
                                    <div className="icon-img">
                                        <img src={icon1} />
                                    </div>
                                    <div className="icon-info">
                                        <p><FormattedMessage id="home-header.icon-info1-1" /><br />
                                            <FormattedMessage id="home-header.icon-info1-2" /></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6 col-xs-6 ">
                                <div className="container">
                                    <div className="icon-img">
                                        <img src={icon2} />
                                    </div>
                                    <div className="icon-info">
                                        <p><FormattedMessage id="home-header.icon-info2-1" /><br />
                                            <FormattedMessage id="home-header.icon-info2-2" /></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6 col-xs-6 ">
                                <div className="container">
                                    <div className="icon-img">
                                        <img src={icon3} />
                                    </div>
                                    <div className="icon-info">
                                        <p><FormattedMessage id="home-header.icon-info3-1" /><br />
                                            <FormattedMessage id="home-header.icon-info3-2" /></p>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-3 col-sm-6 col-xs-6 ">
                                <div className="container">
                                    <div className="icon-img">
                                        <img src={icon4} />
                                    </div>
                                    <div className="icon-info">
                                        <p><FormattedMessage id="home-header.icon-info4-1" /><br />
                                            <FormattedMessage id="home-header.icon-info4-2" /></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>

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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(BannerSlick);
