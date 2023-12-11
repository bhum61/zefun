import { createReducer } from "@reduxjs/toolkit";

import { GET_SONGS_SUCCESS, GET_SONGS_FAILURE, POST_SONG_FAILURE, POST_SONG_SUCCESS, DELETE_SONG_FAILURE, DELETE_SONG_SUCCESS, THEME_TOGGLE, GET_STATS_SUCCESS, GET_STATS_FAILURE, PUT_SONG_SUCCESS } from "./saga/actions";
import { ISong} from "./components/song/Song";
import { StatsType } from "./store";


type ErrorType = {
    message: string,
    response: {
        data: {
            errors:  {
                    param: string
            }[]            
        }
    }
}


const initialState = {
    songs:  [] as Array<ISong>,
    stats: {} as StatsType,
    selectedSong: undefined,
    error: {} as ErrorType,
    loading: true
};


const songsReducer = createReducer(initialState, (builder) => {
    builder.addCase(GET_SONGS_SUCCESS, (state, action: any) => {

        state.loading = false;
        state.error = {} as ErrorType;

        state.songs = action.songs;

    }).addCase(GET_SONGS_FAILURE, (state, action: any) => {

        state.loading = false;
        state.error = action?.error;

    }).addCase(POST_SONG_SUCCESS, (state, action: any) => {

        state.loading = false;
        state.error = {} as ErrorType;

        const createdSong: ISong = action?.song;
        state.songs.push(createdSong);

    }).addCase(POST_SONG_FAILURE, (state, action: any) => {

        state.loading = false;
        state.error = action.error;

    }).addCase(PUT_SONG_SUCCESS, (state, action: any) => {

        state.loading = false;
        state.error = {} as ErrorType;

        const updatedSong: ISong = action.song;

        const songIndex = state.songs.findIndex((song: ISong) => song._id === action.song._id);
        
        state.songs[songIndex] = updatedSong;
    }).addCase(DELETE_SONG_SUCCESS, (state, action: any) => {

        state.loading = false;
        state.error = {} as ErrorType;

        state.songs = state.songs.filter((song: ISong) => song._id !== action.payload);

    }).addCase(DELETE_SONG_FAILURE, (state, action: any) => {

        state.loading = false;
        state.error = action.error;

    }).addCase(GET_STATS_SUCCESS, (state, action: any) => {

        state.loading = false;
        state.stats = action.data;

    }).addCase(GET_STATS_FAILURE, (state, action: any) => {

        state.loading = false;
        state.error = action.error;
    });
});



const themeInitialState = {
    theme: "dark"
}

const themeReducer = createReducer(themeInitialState, (builder) => {
    builder.addCase(THEME_TOGGLE, (state, action) => {

        if(action.type !== 'THEME/TOGGLE_THEME') return;
        state.theme = state.theme === "dark"?"light":"dark";
    });
});


export default songsReducer;
export {themeReducer};