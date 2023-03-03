import { configureStore } from '@reduxjs/toolkit'
import UserReducer from '../redux/reducers/UserReducer'
import MediaReducer from '../redux/reducers/MediaReducer.tsx'
import BidderReducer from '../redux/reducers/BidderReducer'

export default configureStore({
    reducer: {
        UserReducer: UserReducer,
        BidderReducer: BidderReducer,
        MediaReducer: MediaReducer,
    }
})