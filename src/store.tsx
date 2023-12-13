import { combineReducers, configureStore } from '@reduxjs/toolkit';

import createSagaMiddleware from '@redux-saga/core';
import songReducer from "./reducers";
import mySaga from './saga/song';


const rootReducer = combineReducers({songReducer})

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
        reducer: {
                rootReducer,
        },
        middleware: [sagaMiddleware]
});


sagaMiddleware.run(mySaga);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type StatsType = {
    stats: {
        count: string;
        albums: string;
        artists: string;
        genres: string;
    }[];
};
