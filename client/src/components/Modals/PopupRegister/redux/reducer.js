import { INIT_STATE } from '../../../../constants';
import { getActionType } from '../../../../shared/services/getActionType';
import { showRegisterModal, hideRegisterModal } from './actions';

export default function registerPopupReducer(state = INIT_STATE.modal, action) {
    switch (action.type) {
        case getActionType(showRegisterModal):
            return {
                ...state,
                isShowRegister: true,
            };
        case getActionType(hideRegisterModal):
            return {
                ...state,
                isShowRegister: false,
            };
        default:
            return state;
    }
}
