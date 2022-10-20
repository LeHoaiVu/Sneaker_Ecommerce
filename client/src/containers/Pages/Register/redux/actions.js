import { createActions } from 'redux-actions';

export const registerAccount = createActions({
    registerAccountRequest: (payload) => payload,
    registerAccountSuccess: (payload) => payload,
    registerAccountFailure: (error) => error,
    registerAccountClear: () => {
        return;
    },
});
