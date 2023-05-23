import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    position: [],
    users: [],
    notes: [],
    pays: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = []
            return {
                ...state,

            }
        case actionTypes.FETCH_NOTE_SUCCESS:
            state.notes = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_NOTE_FAILED:
            state.notes = []
            return {
                ...state,

            }
        case actionTypes.FETCH_PAY_SUCCESS:
            state.pays = action.data
            return {
                ...state,

            }
        case actionTypes.FETCH_PAY_FAILED:
            state.pays = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users
            return {
                ...state,

            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = []
            return {
                ...state,

            }
        default:
            return state;
    }
}

export default adminReducer;