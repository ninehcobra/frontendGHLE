import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";



import './SystemHome.scss';


class SystemHome extends Component {
    constructor(props) {
        super(props);

    }



    render() {


        return (

            <div>Du me chao mung</div>
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
