import { INIT_STATE } from '../../../../constants';
import { getActionType } from '../../../../shared/services/getActionType';
import { getShoesCart } from './actions';

export default function shoesCart(state = INIT_STATE.shoesCart, action) {
    switch (action.type) {
        case getActionType(getShoesCart.getShoesCartRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(getShoesCart.getShoesCartSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getActionType(getShoesCart.getShoesCartFailure):
            return {
                ...state,
                isLoading: false,
                data: [],
            };
        default:
            return state;
    }
}
