const _parse = (str, fallbackValue) => {
    if (!str) return;
    try {
        return JSON.parse(str);
    } catch (e) {
        console.log(`Invalid parse JSON ${str} with error ${e}`);
        return fallbackValue;
    }
};
const _stringify = (object, fallbackValue) => {
    try {
        return JSON.stringify(object);
    } catch (e) {
        console.log(`Invalid parse JSON ${object} with error ${e}`);
        return fallbackValue;
    }
};

const JsonService = { _parse, _stringify };

export default JsonService;
