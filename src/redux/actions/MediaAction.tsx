import { LOAD_ALL_MEDIA, LOAD_MEDIA_DATA } from './types'
import axios from 'axios'

const instance = axios.create({ baseURL: 'http://82.223.25.72:443/' })

interface loadAllMediaProps {
    criteria: String,
}

export function loadAllMedia(Props: loadAllMediaProps) {
    console.log(Props.criteria);
    return (dispatch: any) => {
        console.log(Props.criteria);
        instance.post('/api/mediaController/loadAllMedia', { criteria: Props.criteria }).then((res) => {
            dispatch({
                type: LOAD_ALL_MEDIA,
                payload: res.data
            })
        });
    }
};

export function loadMediaData(id: any) {
    return (dispatch: any) => {
        instance.post('/api/mediaController/loadMediaData', { id: id }).then((res) => {
            dispatch({
                type: LOAD_MEDIA_DATA,
                payload: res.data
            })
        });
    }
};
