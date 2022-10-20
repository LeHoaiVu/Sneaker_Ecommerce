export const selectMenShoesState = (state) =>
    ((state.menShoesReducer || {}).data || {}).data || [];
