import { createActions } from 'redux-actions';
export const getMenShoes = createActions({
    getMenShoesRequest: undefined,
    getMenShoesSuccess: (payload) => payload,
    getMenShoesFailure: (error) => error,
});
