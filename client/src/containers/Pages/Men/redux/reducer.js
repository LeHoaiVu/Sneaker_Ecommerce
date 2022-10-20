import { INIT_STATE } from '../../../../constants';
import { getActionType } from '../../../../shared/services/getActionType';
import { getMenShoes } from './actions';

export default function menShoesReducer(state = INIT_STATE.menShoes, action) {
    switch (action.type) {
        //get all men shoes
        case getActionType(getMenShoes.getMenShoesRequest):
            return {
                ...state,
                isLoading: true,
            };
        case getActionType(getMenShoes.getMenShoesSuccess):
            return {
                ...state,
                isLoading: false,
                data: action.payload,
            };
        case getActionType(getMenShoes.getMenShoesFailure):
            return {
                ...state,
                isLoading: false,
            };

        default:
            return state;
    }
}
