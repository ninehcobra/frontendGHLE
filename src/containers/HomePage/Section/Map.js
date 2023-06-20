import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './Map.scss';
import { FormattedMessage } from 'react-intl';
import { async } from 'q';
import { getAllProvinceService } from '../../../services/userService';
import { getAllDistrictService } from '../../../services/userService';
import { getWarehouse } from '../../../services/userService';


class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            arrProvince: [],
            arrDistrict: [],
            arrWarehouse: []
        }
    }

    async componentDidMount() {
        await this.getAllProvince()
    }

    getAllProvince = async () => {
        let response = await getAllProvinceService()
        if (response && response.errCode === 0) {
            this.setState({
                arrProvince: response.data
            })

        }
    }

    getAllDistrict = async (id) => {
        let response = await getAllDistrictService(id)

        if (response && response.errCode === 0) {
            this.setState({
                arrDistrict: []
            })
            this.setState({
                arrDistrict: response.data
            })

        }
    }

    onChaneInput = async (id) => {
        let res = await getWarehouse(id)
        this.setState({
            arrWarehouse: res.data
        })
    }

    render() {
        return (
            <div className='section-map'>
                <div className='map-container'>
                    <div className='row'>
                        <div class="col-md-4 col-sm-12 col-xs-12 col-left">
                            <div class="s-title">
                                <h2><FormattedMessage id="home-header.post-offices" />
                                    <span class="text-color"><FormattedMessage id="home-header.app-name" /></span>
                                </h2>
                            </div>
                        </div>
                    </div>
                    <div className='row map'>
                        <div className='col-md-4 col-sm-12 col-xs-12 col-left'>
                            <div className='address-map'>
                                <div className='tab-content'>
                                    <select className='change-tinh' onChange={(event) => this.getAllDistrict(event.target.value)}>
                                        <option value="all">Chọn tỉnh/Thành phố</option>

                                        {this.state.arrProvince.map((item, index) => {
                                            return (<option value={item.id}>{item.name}</option>)
                                        })}

                                    </select>
                                    <select onChange={(e) => this.onChaneInput(e.target.value)} name="select-quan" class="select-quan"><option value="all">Chọn Quận/huyện</option>
                                        {this.state.arrDistrict.map((item, index) => {
                                            return (<option value={item.id}>{item.name}</option>)
                                        })}
                                    </select>

                                    <div className='address-cont'>
                                        <div className='address-detail'>
                                            <ul className='address-link'>
                                                {this.state.arrWarehouse && this.state.arrWarehouse.map((item, index) => {
                                                    return (
                                                        <li className='address-item'>
                                                            <a>
                                                                <b>{item.name}</b>
                                                                <div className='item-detail'>{item.address}</div>
                                                                <span></span>
                                                                <div class="item-time">Thời gian hoạt động: 08h00-18h00 (Thứ Hai - Chủ Nhật)</div>
                                                            </a>
                                                        </li>
                                                    )
                                                })}



                                            </ul>
                                        </div>
                                    </div>

                                    <div className='address-warehouse'>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-8 col-sm-12 col-xs-12 col-right'>
                            <div class="img-map" id="map-store"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4902.890827548273!2d106.80047917589918!3d10.870014157458748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527587e9ad5bf%3A0xafa66f9c8be3c91!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2jhu4cgVGjDtG5nIHRpbiAtIMSQSFFHIFRQLkhDTQ!5e1!3m2!1svi!2sus!4v1687229635657!5m2!1svi!2sus" width="100%" height="576"></iframe></div>
                        </div>

                    </div>
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Map);
