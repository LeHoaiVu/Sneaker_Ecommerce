import { INIT_STATE } from '../../../../constants';
import { getActionType } from '../../../../shared/services/getActionType';
import { getOrders } from './actions';

export default function orderReducer(state = INIT_STATE.orders, action) {
    switch (action.type) {
        case getActionType(getOrders.getOrdersRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(getOrders.getOrdersSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getActionType(getOrders.getOrdersFailure):
            return {
                ...state,
                isLoading: false,
            };
        default:
            return state;
    }
}
