export const userInfoSelector = (state) =>
    (state.globalReducer || {}).userInfo || {};
