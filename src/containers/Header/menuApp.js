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
                name: 'menu.admin.manage-warehouse', link: '/system/manage-warehouse'

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
            //Quản lý đơn hàng

            {
                name: 'menu.transport.order-reception', link: '/system/order-reception'
            },
        ]
    },
];

export const transportMenu = [

    { //Quản lý đơn hàng
        name: 'menu.transport.manage-transport', menus: [
            {
                name: 'menu.transport.order-reception', link: '/system/order-reception'
            },

        ]
    },
];

export const customerMenu = [

    { //Quản lý đơn hàng
        name: 'menu.transport.manage-transport', menus: [
            {
                name: 'Báo cáo - Live', link: '/system/order-reception'
            },
            {
                name: 'Quản lý đơn hàng', link: '/system/order-reception1'
            },
            {
                name: 'Lên đơn Excel', link: '/system/order-reception2'
            },
            {
                name: 'Quản lý cửa hàng', link: '/system/order-reception3'
            },
            {
                name: 'COD & đối soát', link: '/system/order-reception4'
            },
            {
                name: 'Let gogo', link: '/system/order-reception5'
            },
        ]
    },
];