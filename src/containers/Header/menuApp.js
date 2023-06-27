export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user', menus: [


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
                name: 'menu.admin.manage-order', link: '/system/manage-order'
            },
            {
                name: 'menu.admin.manage-delivery-staff', link: '/system/user-delivery-staff'

            },

            {
                name: 'Quản lý kho', link: '/system/manage-warehouse-order'

            },
            {
                name: 'menu.transport.order-reception', link: '/system/order-reception'
            },
        ]
    },


    { //Quản lý giao hàng
        name: 'Giao hàng', menus: [
            {
                name: 'Đơn hàng', link: '/system/news'
            },
            //Quản lý đơn hàng


        ]
    },



    { //Quản lý tin tức
        name: 'Tin tức', menus: [
            {
                name: 'Quản lý tin tức', link: '/system/news'
            },
            //Quản lý đơn hàng


        ]
    },
];

export const transportMenu = [

    { //Quản lý giao hàng
        name: 'Giao hàng', menus: [
            {
                name: 'Giao hàng', link: '/system/delivery'
            },
            //Quản lý đơn hàng


        ]
    },

];

export const WarehouseMenu = [
    { //Quản lý Kho hàng
        name: 'menu.admin.warehouse', menus: [
            {
                name: 'menu.admin.manage-delivery-staff', link: '/system/user-delivery-staff'

            },

            {
                name: 'Quản lý kho', link: '/system/manage-warehouse-order'

            },
            {
                name: 'menu.transport.order-reception', link: '/system/order-reception'
            },
        ]
    },
];