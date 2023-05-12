import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './HomeFooter.scss';
import { FormattedMessage } from 'react-intl';


class HomeFooter extends Component {


    render() {
        return (
            <>
                <div className='home-footer'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-6 col-xs-12 col-left'>
                                <p>Bản quyền thuôc về Trương Nguyễn Công Chính - 20520884 &copy; 2023 </p>
                            </div>
                            <div className='col-md-6 col-sm-6 col-xs-12 col-right'>
                                <div className='more-info'>

                                    <p>Thêm thông tin</p>
                                    <a href='https://github.com/ninehcobra/frontendGHLE'>
                                        <i className="fab fa-github"></i>
                                    </a>
                                    <a href='https://www.facebook.com/congchinh.truongnguyen.5/'>
                                        <i className="fab fa-facebook"></i>
                                    </a>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
