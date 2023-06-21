import locationHelperBuilder from "redux-auth-wrapper/history4/locationHelper";
import { connectedRouterRedirect } from "redux-auth-wrapper/history4/redirect";

const locationHelper = locationHelperBuilder({});

export const CustomerIsAuthenticated = connectedRouterRedirect({
    authenticatedSelector: state => state.customer.isLoggedIn,
    wrapperDisplayName: 'CustomerIsAuthenticated',
    redirectPath: '/login-user'
});

export const CustomerIsNotAuthenticated = connectedRouterRedirect({
    // Want to redirect the user when they are authenticated
    authenticatedSelector: state => !state.customer.isLoggedIn,
    wrapperDisplayName: 'CustomerIsNotAuthenticated',
    redirectPath: '/',
    allowRedirectBack: false
});