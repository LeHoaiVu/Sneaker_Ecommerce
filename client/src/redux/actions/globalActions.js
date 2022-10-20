import { createAction, createActions } from 'redux-actions';
import { ACTIONS } from '../../constants';

export const getUserInfo = createAction(
    ACTIONS.getUserInfo,
    (payload) => payload
);

export const logout = createAction(ACTIONS.logout);

export const addToCartShoes = createActions({
    addToCartShoesRequest: (payload) => {
        return payload;
    },
    addToCartShoesSuccess: (payload) => payload,
    addToCartShoesFailure: (error) => error,
});

export const updateToCartShoes = createActions({
    updateToCartShoesRequest: (payload) => payload,
    updateToCartShoesSuccess: (payload) => payload,
    updateToCartShoesFailure: (error) => error,
});

export const deleteFromCartShoes = createActions({
    deleteFromCartShoesRequest: (payload) => payload,
    deleteFromCartShoesSuccess: (payload) => payload,
    deleteFromCartShoesFailure: (error) => error,
});

export const checkExpriedToken = createAction('CHECKING_EXPIRIED_TOKEN');
