const initialState = {
    currentUser: {
        username: null,
        password: null,
        role: 'user'
    },
    detail: null,
    regUser: {
        username: null,
        email: null,
        password1: null,
        password2: null,
        non_field_errors: null
    },
    redirectToLogin: false,
    connectionProblem: null,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return {...state, currentUser: action.payload};
        case 'LOGOUT_USER':
            return {...state, currentUser: {}, redirectToLogin: true };
        case 'DETAIL_MSG':
            return {...state, detail: action.payload };
        case 'ERROR_LOGIN':
            return {...state, regUser: action.payload };
        case 'CONNECTION_PROBLEM':
            return {...state, connectionProblem: action.payload };
        default:
            return state;
    }
}