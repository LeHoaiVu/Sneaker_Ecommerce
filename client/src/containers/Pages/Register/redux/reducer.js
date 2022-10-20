import { INIT_STATE } from '../../../../constants';
import { getActionType } from '../../../../shared/services/getActionType';
import { registerAccount } from './actions';

export default function registerAccountReducer(
    state = INIT_STATE.register,
    action
) {
    switch (action.type) {
        case getActionType(registerAccount.registerAccountRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(registerAccount.registerAccountSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload.data,
            };
        case getActionType(registerAccount.registerAccountFailure):
            return {
                ...state,
                isLoading: false,
                data: action.payload.response.data,
            };
        case getActionType(registerAccount.registerAccountClear):
            return {
                ...state,
                isLoading: false,
                data: [],
            };
        default:
            return state;
    }
}
