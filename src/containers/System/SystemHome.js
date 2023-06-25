import React, { Component } from 'react';
import { connect } from 'react-redux';
import welcome from '../../assets/200w.webp'
import * as actions from "../../store/actions";



import './SystemHome.scss';


class SystemHome extends Component {
    constructor(props) {
        super(props);

    }



    render() {


        return (

            <div className='update-container'>
                <div className='update-content' >
                    <img style={{ marginTop: '40px' }} className='image' src={welcome}></img>
                    <div className='update-text'>{'Chào mừng bạn đã quay trở lại với ứng dụng!!! Chúc bạn một ngày làm việc hiệu quả!!!'}

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SystemHome);
