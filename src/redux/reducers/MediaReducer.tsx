import { LOAD_ALL_MEDIA, LOAD_MEDIA_DATA } from '../actions/types';

const initState = {
    medias: [],
    media: null,
    bids: [],
    refresh: 0
};

export default function todo(state = initState, action: any) {
    switch (action.type) {
        case LOAD_ALL_MEDIA:
            return {
                ...state,
                medias: action.payload.data,
                refresh: 0
            }
        case LOAD_MEDIA_DATA:
            return {
                ...state,
                media: action.payload.data.media,
                bids: action.payload.data.bids,
                refresh: 0
            }
        default:
            return state
    }
}