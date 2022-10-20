export const loginSelector = (state) =>
    (state.loginAccountReducer || {}).data || {};
