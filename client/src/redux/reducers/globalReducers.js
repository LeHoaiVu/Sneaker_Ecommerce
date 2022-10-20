import { INIT_STATE } from '../../constants';
import { getActionType } from '../../shared/services/getActionType';
import * as globalActions from '../actions/globalActions';

export default function globalReducer(state = INIT_STATE.config, action) {
    switch (action.type) {
        //get user info
        case getActionType(globalActions.getUserInfo): {
            return {
                ...state,
                userInfo: action.payload,
            };
        }

        //logout
        case getActionType(globalActions.logout): {
            return { ...state, userInfo: {} };
        }

        //update data in user info
        // add to cart
        case getActionType(globalActions.addToCartShoes.addToCartShoesRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(globalActions.addToCartShoes.addToCartShoesSuccess):
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload.data.userInfo,
            };
        case getActionType(globalActions.addToCartShoes.addToCartShoesFailure):
            return {
                ...state,
                isLoading: false,
            };

        //update to cart
        case getActionType(
            globalActions.updateToCartShoes.updateToCartShoesRequest
        ):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(
            globalActions.updateToCartShoes.updateToCartShoesSuccess
        ):
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload.data.userInfo,
            };
        case getActionType(
            globalActions.updateToCartShoes.updateToCartShoesFailure
        ):
            return {
                ...state,
                isLoading: false,
            };

        //delete from cart
        case getActionType(
            globalActions.deleteFromCartShoes.deleteFromCartShoesRequest
        ):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(
            globalActions.deleteFromCartShoes.deleteFromCartShoesSuccess
        ):
            return {
                ...state,
                isLoading: false,
                userInfo: action.payload.data.userInfo,
            };
        case getActionType(
            globalActions.deleteFromCartShoes.deleteFromCartShoesFailure
        ):
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
