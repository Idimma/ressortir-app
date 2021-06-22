import React, {createContext, useMemo, useReducer} from 'react';

import PropTypes from 'prop-types';

export const AuthContext = createContext();

const initialState = ({
    isLoggedIn: false,
    user: {email: '',},
    auth: {
        email_or_phone: '',
        password: ''
    },
    reset: '',
    commissions: [],
    cards: [],
    shops: [],
    products: [],
    info: {
        referrals: 0, ref_earnings: 0, network_earnings: 0, all: 0
    },
    wish: [],
    bookings: [],
    network: [],
    cart: {
        items: [],
        details: {}
    },
    orders: {
        current: [],
        completed: [],
    },
    otp_code: {
        otp: '',
        otp_secret: ''
    },
    addresses: [],
    categories: [],
    settings: {},
    wallet: {},
    searches: [],
});

const reducer = (state, action) => {
    switch (action.type) {
        case 'SIGN_IN': {
            return {isLoggedIn: true};
        }
        case 'SIGN_OUT': {
            return {isLoggedIn: false};
        }
        case 'STATE_CHANGE': {
            return {...state, ...action.payload};
        }
        default:
            return initialState;
    }
};

const AuthProvider = ({children}) => {
    const [auth, dispatch] = useReducer(reducer, initialState);
    const contextValue = useMemo(() => ({auth, dispatch}), [auth, dispatch]);
    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AuthProvider;
