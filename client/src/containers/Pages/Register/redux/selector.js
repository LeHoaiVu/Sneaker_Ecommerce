export const registerSelector = (state) =>
    (state.registerAccountReducer || {}).data || [];
