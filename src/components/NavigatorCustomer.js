import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import './NavigatorCustomer.scss';

const MenuGroup = ({ name, children }) => {
    return (
        <li style={{ textDecoration: 'none' }}>
            <ul className="menu-list list-unstyled">{children}</ul>
        </li>
    );
};

const Menu = ({ name, link, onClick }) => {
    return (
        <li>
            <a href={link} onClick={() => onClick(link)}>
                {name}
            </a>
        </li>
    );
};

class NavigatorCustomer extends Component {
    state = {
        expandedMenu: {},
    };

    toggle = (groupIndex, menuIndex) => {
        const key = `${groupIndex}_${menuIndex}`;
        this.setState((prevState) => ({
            expandedMenu: {
                ...prevState.expandedMenu,
                [key]: !prevState.expandedMenu[key],
            },
        }));
    };

    isMenuActive = (location, link) => {
        return location.pathname === link;
    };

    checkActiveMenu = () => {
        const { menus, location } = this.props;
        const expandedMenu = {};

        for (let i = 0; i < menus.length; i++) {
            const group = menus[i];
            if (group.menus && group.menus.length > 0) {
                for (let j = 0; j < group.menus.length; j++) {
                    const menu = group.menus[j];
                    if (this.isMenuActive(location, menu.link)) {
                        const key = `${i}_${j}`;
                        expandedMenu[key] = true;
                        break;
                    }
                }
            }
        }

        this.setState({
            expandedMenu: expandedMenu,
        });
    };

    componentDidMount() {
        this.checkActiveMenu();
    }

    componentDidUpdate(prevProps) {
        const { location: prevLocation } = prevProps;
        const { location } = this.props;

        if (location !== prevLocation) {
            this.checkActiveMenu();
        }
    }

    handleMenuItemClick = (link) => {
        const { onItemClick } = this.props;
        onItemClick(link);
    };

    render() {
        console.log('render ne ')
        const { menus } = this.props;
        const { expandedMenu } = this.state;

        return (
            <Fragment>
                <div className="slidebar_menu">
                    <div className="slidebar_menu__body">
                        {menus.map((group, groupIndex) => (
                            <MenuGroup key={groupIndex} name={group.name}>
                                {group.menus.map((menu, menuIndex) => (
                                    <Fragment key={menuIndex}>
                                        <Menu
                                            name={menu.name}
                                            link={menu.link}
                                            onClick={this.handleMenuItemClick}
                                        />
                                        {menu.subMenus && menu.subMenus.length > 0 && (
                                            <ul
                                                className={`sub-menu ${expandedMenu[`${groupIndex}_${menuIndex}`] ? 'expanded' : ''
                                                    }`}
                                            >
                                                {menu.subMenus.map((subMenu, subMenuIndex) => (
                                                    <Menu
                                                        key={subMenuIndex}
                                                        name={subMenu.name}
                                                        link={subMenu.link}
                                                        onClick={this.handleMenuItemClick}
                                                    />
                                                ))}
                                            </ul>
                                        )}
                                    </Fragment>
                                ))}
                            </MenuGroup>
                        ))}
                    </div>
                    <div className="app-info">
                        <a href="">
                            <div className="item_menu">
                                <i className="p-r-8 fz-20 fas fa-sign-out-alt" aria-hidden="true"></i>
                                <span className="text_block">
                                    <FormattedMessage id="logout" defaultMessage="Logout" />
                                </span>
                            </div>
                            <div className="text_version">
                                <FormattedMessage
                                    id="version"
                                    defaultMessage="Version {version}"
                                    values={{ version: '1.0.0' }}
                                />
                            </div>
                        </a>
                        <div className="uit">
                            <a href="">
                                <img
                                    src="https://tse4.mm.bing.net/th?id=OIP.j0he3gIN-2KWaBmq-PhqTAAAAA&amp;pid=Api&amp;P=0"
                                    alt=""
                                />
                            </a>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default withRouter(NavigatorCustomer);
