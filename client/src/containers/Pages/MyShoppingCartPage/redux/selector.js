export const selectMenShoesCartSelector = (state) =>
    ((state.shoesCartReducer || {}).data || {}).data || [];
