import {
    CHECK_OUT,
    HOME_PAGE,
    LOGIN_PAGE,
    MEN_SHOES_PAGE,
    MY_SHOP,
    MY_SHOPING_CART,
    ORDER_PAGE,
    REGISTER_PAGE,
} from '../configs/routeConfig';
import CheckoutPage from '../containers/Pages/CheckoutPage';
import HomePage from '../containers/Pages/HomePage';
import LoginPage from '../containers/Pages/Login';
import Men from '../containers/Pages/Men';
import MyOrder from '../containers/Pages/MyOrderPage';
import MyShopPage from '../containers/Pages/MyShopPage';
import MyShoppingCartPage from '../containers/Pages/MyShoppingCartPage';
import RegisterPage from '../containers/Pages/Register';

export const routes = [
    {
        path: HOME_PAGE,
        component: HomePage,
        exact: true,
    },
    {
        path: MEN_SHOES_PAGE,
        component: Men,
    },
    {
        path: REGISTER_PAGE,
        component: RegisterPage,
    },
    {
        path: LOGIN_PAGE,
        component: LoginPage,
    },
    {
        path: MY_SHOP,
        component: MyShopPage,
    },
    {
        path: MY_SHOPING_CART,
        component: MyShoppingCartPage,
    },
    {
        path: CHECK_OUT,
        component: CheckoutPage,
    },
    {
        path: ORDER_PAGE,
        component: MyOrder,
    },
];
