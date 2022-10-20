import JsonService from './jsonService';

export const BROWSER_KEY = {
    ACCESS_TOKEN: 'access_token',
    REGISTER_DATA: 'register_data',
    USER_INFO: 'user_info',
    ORDERED_SHOES: 'ordered_shoes',
};

const setBrowserData = (key, value) => {
    if (typeof value === 'string') {
        localStorage.setItem(key, value);
    }
    localStorage.setItem(key, JsonService._stringify(value));
};

const getBrowserData = (key, defaultValue) => {
    const value = localStorage.getItem(key);
    return value ? JsonService._parse(value) : defaultValue;
};

const clearBrowserData = (key) => {
    localStorage.removeItem(key);
};
const clearAllBrowserData = (key) => {
    localStorage.clear(key);
};

const BrowserStoreService = {
    getBrowserData,
    clearBrowserData,
    clearAllBrowserData,
    setBrowserData,
};

export default BrowserStoreService;
