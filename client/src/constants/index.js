export const INIT_STATE = {
    modal: {
        isShowRegister: false,
    },
    menShoes: {
        isLoading: false,
        data: [],
    },
    shoesCart: {
        isLoading: false,
        data: [],
    },
    register: {
        isLoading: false,
        data: [],
    },
    updateUser: {
        isLoading: false,
        data: [],
    },
    login: {
        isLoading: false,
        data: {},
    },
    orders: {
        isLoading: false,
        data: {},
    },
    config: {
        isLoading: false,
        userInfo: {},
    },
};

export const VERBS = {
    GET: 'get',
    POST: 'post',
    PUT: 'put',
    DELETE: 'delete',
};

const GLOBAL_ACTION = 'GLOBAL_ACTION';
export const ACTIONS = {
    //user info
    getUserInfo: `${GLOBAL_ACTION}/GET_USER_INFO`,

    //logout
    logout: `${GLOBAL_ACTION}/LOGOUT`,
};

export const address = [
    {
        name: 'Ho chi minh',
        children: [
            {
                name: 'Thu duc',
                children: [
                    { name: 'Phuong 1' },
                    { name: 'Phuong 2' },
                    { name: 'Phuong 3' },
                ],
            },
            {
                name: 'Quan 1',
                children: [],
            },
            {
                name: 'Quan 3',
                children: [],
            },
            {
                name: 'Quan 4',
                children: [],
            },
            {
                name: 'Quan 5',
                children: [],
            },
            {
                name: 'Quan 6',
                children: [],
            },
            {
                name: 'Quan 7',
                children: [],
            },
            {
                name: 'Quan 8',
                children: [],
            },
            {
                name: 'Quan 10',
                children: [],
            },
            {
                name: 'Quan 11',
                children: [],
            },
            {
                name: 'Quan 12',
                children: [],
            },
            {
                name: 'Binh Tan',
                children: [],
            },
            {
                name: 'Binh Thanh',
                children: [],
            },
            {
                name: 'Go Vap',
                children: [],
            },
            {
                name: 'Phu Nhuan',
                children: [],
            },
            {
                name: 'Tan Binh',
                children: [],
            },
            {
                name: 'Tan Phu',
                children: [],
            },
            {
                name: 'Binh Chanh',
                children: [],
            },
            {
                name: 'Can Gio',
                children: [],
            },
            {
                name: 'Cu Chi',
                children: [],
            },
            {
                name: 'Hoc Mon',
                children: [],
            },
            {
                name: 'Nha Be',
                children: [],
            },
        ],
    },
    {
        name: 'Ha noi',
        children: [
            {
                name: 'Ba Dinh',
                children: [],
            },
            {
                name: 'Bac Tu Liem',
                children: [],
            },
            {
                name: 'Cau Giay',
                children: [],
            },
            {
                name: 'Dong Da',
                children: [],
            },
            {
                name: 'Ha Dong',
                children: [],
            },
            {
                name: 'Hai Ba Trung',
                children: [],
            },
            {
                name: 'Hoan Kiem',
                children: [],
            },
            {
                name: 'Hoang Mai',
                children: [],
            },
            {
                name: 'Long Bien',
                children: [],
            },
            {
                name: 'Nam Tu Liem',
                children: [],
            },
            {
                name: 'Tay Ho',
                children: [],
            },
            {
                name: 'Thanh Xuan',
                children: [],
            },
            {
                name: 'Son Tay',
                children: [],
            },
            {
                name: 'Ba Vi',
                children: [],
            },
            {
                name: 'Chuong My',
                children: [],
            },
            {
                name: 'Dan Phuong',
                children: [],
            },
            {
                name: 'ĐOng Anh',
                children: [],
            },
            {
                name: 'Gia Lam',
                children: [],
            },
            {
                name: 'Hoai Đuc',
                children: [],
            },
            {
                name: 'Me Linh',
                children: [],
            },
            {
                name: 'My Đuc',
                children: [],
            },
            {
                name: 'Phu Xuyen',
                children: [],
            },
            {
                name: 'Phuc Tho',
                children: [],
            },
            {
                name: 'Quoc Oai',
                children: [],
            },
            {
                name: 'Soc Son',
                children: [],
            },
            {
                name: 'Thach That',
                children: [],
            },
            {
                name: 'Thanh Oai',
                children: [],
            },
            {
                name: 'Thanh Tri',
                children: [],
            },
            {
                name: 'Thuong Tin',
                children: [],
            },
            {
                name: 'Ung Hoa',
                children: [],
            },
        ],
    },
];
