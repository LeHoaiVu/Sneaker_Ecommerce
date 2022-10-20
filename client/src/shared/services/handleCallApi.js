import axios from 'axios';
import {
    API_ADD_USER_CART,
    API_DELETE_USER_CART,
    API_GET_SHOES_CART,
    API_UPDATE_USER_CART,
    APP_URL,
} from '../../configs/apiConfig';
import {
    LOGIN_PAGE,
    MEN_SHOES_PAGE,
    REGISTER_PAGE,
} from '../../configs/routeConfig';
import { buildUrlParams } from '../../ultilities/helpers';
import BrowserStoreService, { BROWSER_KEY } from './browserStoreServices';

// export const getMenShoes = () => {
//     const result = axios
//         .get(`${APP_URL + MEN_SHOES_PAGE}`, {
//             headers: {
//                 'Access-Control-Allow-Origin': '*',
//                 Authorization: `Bearer ${BrowserStoreService.getBrowserData(
//                     BROWSER_KEY.ACCESS_TOKEN
//                 )}`,
//             },
//         })
//         .then((data) => {
//             return data;
//         })
//         .catch((error) => {
//             console.log(
//                 `Error in call API ${APP_URL + MEN_SHOES_PAGE} to get data`,
//                 error
//             );
//         });
//     return result;
// };

export const getMenShoes = async () => {
    return await apiGet(`${APP_URL + MEN_SHOES_PAGE}`, undefined, 3, false);
};

export const getShoesCart = async ({ userId, cart = [] }) => {
    return await apiPost(
        `${APP_URL + API_GET_SHOES_CART}`,
        cart,
        3,
        true,
        userId
    );
};

// export const createAccount = (registerValue) => {
//     return axios
//         .post(`${APP_URL + REGISTER_PAGE}`, registerValue)
//         .then((data) => {
//             return data;
//         })
//         .catch((error) => {
//             console.log(
//                 `Error in call API ${APP_URL + REGISTER_PAGE} to get data`,
//                 error
//             );
//             throw error;
//         });
// };

//register
export const createAccount = async (registerValues) => {
    return await apiPost(`${APP_URL + REGISTER_PAGE}`, registerValues, 0);
};

//login
export const loginAccount = async (loginValues) => {
    return await apiPost(`${APP_URL + LOGIN_PAGE}`, loginValues, 3, true);
};

//add to cart
export const addUserCart = async (updatedData) => {
    return await apiPost(
        `${APP_URL + API_ADD_USER_CART}`,
        updatedData,
        0,
        true
    );
};

//update to cart
export const updateUserCart = async (updatedData) => {
    return await apiPut(`${APP_URL + API_UPDATE_USER_CART}`, updatedData, true);
};

//delete from cart
export const deleteUserCart = async (deletedData) => {
    return await apiPut(`${APP_URL + API_DELETE_USER_CART}`, deletedData, true);
};

const axiosHeaderConfig = (token = null) => {
    return {
        'Access-Control-Allow-Origin': '*',
        Authorization: `Bearer ${
            token
                ? token
                : BrowserStoreService.getBrowserData(BROWSER_KEY.ACCESS_TOKEN)
        }`,
    };
};

// POST
const apiPost = async (url, payload, retries = 3, addHeader, params) => {
    const result = { error: null, data: null };
    if (params) {
        url = buildUrlParams(url, params);
    }
    try {
        const resp = await axios.post(url, payload, {
            headers: addHeader
                ? axiosHeaderConfig()
                : {
                      'Access-Control-Allow-Origin': '*',
                  },
        });

        result.data = resp;
        return result;
    } catch (error) {
        result.error = error;
        if (retries > 0) {
            if (params) {
                return await apiPost(
                    url,
                    payload,
                    retries - 1,
                    addHeader,
                    params
                );
            }
            return await apiPost(url, payload, retries - 1, addHeader);
        }
        return result;
    }
};

//PUT
const apiPut = async (url, payload, addHeader) => {
    const result = { error: null, data: null };
    try {
        const resp = await axios.put(url, payload, {
            headers: addHeader
                ? axiosHeaderConfig()
                : {
                      'Access-Control-Allow-Origin': '*',
                  },
        });

        result.data = resp;
        return result;
    } catch (error) {
        result.error = error;
        return result;
    }
};

//GET
const apiGet = async (url, retries = 3, addHeader, params) => {
    const result = { error: null, data: null };
    if (params) {
        url = buildUrlParams(url, params);
    }
    try {
        const resp = await axios.get(url, {
            headers: addHeader
                ? axiosHeaderConfig()
                : {
                      'Access-Control-Allow-Origin': '*',
                  },
        });
        result.data = resp;
        return result;
    } catch (error) {
        result.error = error;
        if (retries > 0) {
            if (params) {
                return await apiGet(url, retries - 1, addHeader, params);
            }
            return await apiGet(url, retries - 1, addHeader);
        }
        return result;
    }
};
