import { createActions } from 'redux-actions';

export const getOrders = createActions({
    getOrdersRequest: (payload) => payload,
    getOrdersSuccess: (payload) => payload,
    getOrdersFailure: (error) => error,
});
