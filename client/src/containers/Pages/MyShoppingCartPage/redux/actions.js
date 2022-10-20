import { createActions } from 'redux-actions';

export const getShoesCart = createActions({
    getShoesCartRequest: (payload) => payload,
    getShoesCartSuccess: (payload) => payload,
    getShoesCartFailure: (error) => error,
});
