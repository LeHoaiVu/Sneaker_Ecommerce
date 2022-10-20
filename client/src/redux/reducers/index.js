import { combineReducers } from 'redux';
import menShoesReducer from '../../containers/Pages/Men/redux/reducer';
import registerAccountReducer from '../../containers/Pages/Register/redux/reducer';
import registerPopupReducer from '../../components/Modals/PopupRegister/redux/reducer';
import loginAccountReducer from '../../containers/Pages/Login/redux/reducer';
import shoesCartReducer from '../../containers/Pages/MyShoppingCartPage/redux/reducer';
import globalReducer from './globalReducers';
import orderReducer from '../../containers/Pages/MyOrderPage/redux/reducer';

export default combineReducers({
    registerPopupReducer,
    menShoesReducer,
    registerAccountReducer,
    loginAccountReducer,
    shoesCartReducer,
    orderReducer,
    globalReducer,
});
