import { LOAD_ALL_USER, FIND_OR_CREATE_USER_DATA, USER_REFRESH } from '../actions/types';

const initState = {
    user: null,
    users: [],
    refresh: 1
};

export default function todo(state = initState, action: any) {
    switch (action.type) {
        case LOAD_ALL_USER:
            return {
                ...state,
                users: action.payload,
                refresh: 0
            }
        case FIND_OR_CREATE_USER_DATA:
            return {
                ...state,
                user: action.payload,
                refresh: 0
            }
        case USER_REFRESH:
            return {
                ...state,
                refresh: 1
            }
        default:
            return state
    }
}