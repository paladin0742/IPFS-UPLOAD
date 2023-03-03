import { FIND_OR_CREATE_USER_DATA, LOAD_ALL_USER, USER_REFRESH } from './types'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://82.223.25.72:443/' })

export function loadAllUser() {
    return (dispatch: any) => {
        instance.get('/api/userController/loadAllUser').then((res) => {
            dispatch({
                type: LOAD_ALL_USER,
                payload: res.data
            })
        });
    }
};
interface findOrCreateUserDataProps {
    id: string,
}
export function findOrCreateUserData(Props: findOrCreateUserDataProps) {
    console.log(Props.id);
    return (dispatch: any) => {
        instance.post('/api/userController/findOrCreateUserData', { address: Props.id }).then((res) => {
            dispatch({
                type: FIND_OR_CREATE_USER_DATA,
                payload: res.data
            })
        })
    }
}

interface UpdateProps {
    dt: any,
}
export function updateUserName(Props: UpdateProps) {
    console.log(Props.dt);
    return (dispatch: any) => {
        instance.post('/api/userController/updateUserName', { dt: Props.dt }).then((res) => {
            dispatch({
                type: USER_REFRESH,
                payload: res.data
            })
        })
    }
}

export function updateUserImage(Props: UpdateProps) {
    return (dispatch: any) => {
        instance.post('/api/userController/updateUserImage', { dt: Props.dt }).then((res) => {
            dispatch({
                type: USER_REFRESH,
                payload: res.data
            })
        })
    }
}