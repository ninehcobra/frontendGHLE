import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserRedux from '../containers/System/Admin/UserRedux';
import ManageOrder from '../containers/System/Order/ManageOrder';
import Header from '../containers/Header/Header';
import OrderReception from '../containers/System/Order/OrderReception';
import Warehouse from '../containers/Warehouse/Warehouse';
import CustomerHome from '../containers/Customer/CustomerHome/CustomerHome';
import SystemHome from '../containers/System/SystemHome';
import New from '../containers/System/New';
class System extends Component {
    render() {

        const { systemMenuPath, isLoggedIn, userInfo } = this.props;
        if (userInfo.roleId === 'R5') {
            return <Redirect to="/customer" />;
        }

        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>

                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/news" component={New} />
                            <Route path="/system/manage-warehouse" component={Warehouse} />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-order" component={ManageOrder} />
                            <Route path="/system/order-reception" component={OrderReception} />

                        </Switch>
                    </div>
                </div>
            </>
        );


    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
        isLoggedIn: state.user.isLoggedIn, userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
