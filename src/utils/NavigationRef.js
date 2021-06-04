import AsyncStorage from '@react-native-async-storage/async-storage';
let token = '';

let navigator, client, app,
    dispatch = () => {
    },
    dropDownAlert = {};
export const setNavigator = nav => navigator = nav;
export const setToken = _token => token = _token;
export const setClient = _client => client = _client;
export const setDispatch = _dispatch => dispatch = _dispatch;
export const setThis = self => app = self;
export const selfState = (state = {}) => app.setState(state)
export const setAppState = (state = {}) => dispatch({
    type: 'STATE_CHANGE',
    payload: state
});
export const setDropDown = drop => dropDownAlert = drop;

export const showAlert = () => dropDownAlert;
export const getToken = () => token;
export const getClient = () => client;
export const getNavigator = () => navigator;

export const storeJsonData = async (key, value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(`@${key}`, jsonValue);
    } catch (e) {
        // saving error
    }
};
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(`@${key}`, value);
    } catch (e) {
        // saving error
    }
};

export const getStoredData = async (key, _default = '') => {
    try {
        const value = await AsyncStorage.getItem(`@${key}`);
        if (value !== null) {
            return value;
        }
        return _default;
    } catch (e) {
        return _default;
    }
};

export const getJSONData = async (key, _default = {}) => {
    try {
        const jsonValue = await AsyncStorage.getItem(`@${key}`);
        return jsonValue != null ? JSON.parse(jsonValue) : _default;
    } catch (e) {
        return _default;
    }
};
