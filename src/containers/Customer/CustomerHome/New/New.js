import React, { Component } from 'react';
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import './New.scss'
import Header from '../../../HomePage/Header'
import { getNewById } from '../../../../services/userService';
import HomeFooter from '../../../HomePage/HomeFooter';
class New extends Component {

    constructor(props) {
        super(props);
        this.state = {
            new: []
        }
    }

    async componentDidMount() {
        let res = await getNewById(this.props.match.params.id)

        await this.setState({
            new: res.data
        })
        console.log(this.state.new.header)
    }




    render() {
        console.log(this.props.match.params.id)

        return (
            <>
                <Header></Header>

                <nav aria-label="breadcrumb">

                    <ol class="breadcrumb">
                        <div className='container' style={{ display: 'flex' }}>
                            <li class="breadcrumb-item " ><a className='breadcrumb-news' href="/home">Trang chủ</a></li>
                            <li style={{ textTransform: 'lowercase' }} class="breadcrumb-item active" aria-current="page">{this.state.new ? this.state.new.header : ''}</li>
                        </div>
                    </ol>
                </nav>
                <div className='container'>
                    <div className='heading-new'>
                        <h1>{this.state.new.header}</h1>
                    </div>

                    <div dangerouslySetInnerHTML={{ __html: this.state.new.contentHTML }} className='content-new'>

                    </div>
                </div>
                <HomeFooter></HomeFooter>
            </>



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

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(New);
