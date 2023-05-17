import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageOrder.scss'
class ManageOrder extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }


    }


    componentDidMount() {
    }


    render() {
        return (
            <div className='manage-order-body mt-3'>
                <div className='container'>
                    <div className='row'>
                        <div className='row order-info' >
                            <div className='col-md-4 offset-md-2'>
                                <div className='sender-info'>
                                    <div className='info-title'>
                                        | Bên gửi
                                    </div>
                                    <div>
                                        <span className='shop-name'>0797260870 - 0797260870</span>
                                        <span className='shop-address'></span>
                                    </div>
                                </div>
                            </div>
                            <div className='col-md-4 offset-md-0'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);








