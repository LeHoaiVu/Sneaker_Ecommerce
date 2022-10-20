import { INIT_STATE } from '../../../../constants';
import { getActionType } from '../../../../shared/services/getActionType';
import { addToCartShoes } from '../../../../redux/actions/globalActions';
import { loginAccount } from './actions';

export default function loginAccountReducer(state = INIT_STATE.login, action) {
    switch (action.type) {
        case getActionType(loginAccount.loginAccountRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(loginAccount.loginAccountSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
            };
        case getActionType(loginAccount.loginAccountFailure):
            return {
                ...state,
                isLoading: false,
                data: action.payload.response.data,
            };
        case getActionType(loginAccount.loginAccountClear):
            return {
                ...state,
                isLoading: false,
                data: {},
            };
        default:
            return state;
    }
}
