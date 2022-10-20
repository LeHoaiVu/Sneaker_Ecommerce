// remove first meet item
export const removeFirst = (arr, target) => {
    const idx = arr.indexOf(target);
    if (idx > -1) {
        arr.splice(idx, 1);
    }
    return arr;
};
