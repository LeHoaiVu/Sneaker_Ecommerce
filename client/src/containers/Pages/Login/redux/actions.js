import { createActions } from 'redux-actions';

export const loginAccount = createActions({
    loginAccountRequest: (payload) => payload,
    loginAccountSuccess: (payload) => payload,
    loginAccountFailure: (error) => error,
    loginAccountClear: () => {
        return;
    },
});
