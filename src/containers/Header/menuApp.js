export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [
            {
                name: 'menu.admin.manage-delivery-staff', link: '/system/user-delivery-staff'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            {
                name: 'menu.admin.manage-admin', link: '/system/user-admin'

            },

            {
                name: 'menu.admin.crud', link: '/system/user-manage'

            },

            {
                name: 'menu.admin.crud-redux', link: '/system/user-redux'

            },
        ]
    },

    { //Quản lý Kho hàng
        name: 'menu.admin.warehouse', menus: [
            {
                name: 'menu.admin.manage-product', link: '/system/manage-product'
            },

            {
                name: 'menu.admin.manage-warehouse', link: '/system/manage-warehouse'

            },

            {
                name: 'menu.admin.report-statistic', link: '/system/report-statistic'

            },
        ]
    },

    { //Quản lý lên đơn
        name: 'menu.admin.order', menus: [
            {
                name: 'menu.admin.manage-order', link: '/system/manage-order'
            },

        ]
    },
];