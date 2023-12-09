import { createReducer } from "@reduxjs/toolkit";

import { GET_SONGS_SUCCESS, GET_SONGS_FAILURE, POST_SONG_FAILURE, POST_SONG_SUCCESS, DELETE_SONG_FAILURE, DELETE_SONG_SUCCESS, EDIT_SONG_EDIT, THEME_TOGGLE, GET_STATS_SUCCESS, GET_STATS_FAILURE } from "./saga/actions";
import { ISong} from "./components/song/Song";

const initialState = {
    songs: [],
    stats: {},
    selectedSong: undefined,
    error: undefined
};

const songsReducer = createReducer(initialState, (builder) => {
    builder.addCase(GET_SONGS_SUCCESS, (state, action: any) => {
        state.error = undefined;
        state.songs = action.songs;

    }).addCase(GET_SONGS_FAILURE, (state, action) => {
        state.error = action.error;

    }).addCase(POST_SONG_SUCCESS, (state, action) => {
        state.error = undefined;
        state.songs.push(action.song);
          
    }).addCase(POST_SONG_FAILURE, (state, action: any) => {
        state.error = action.error;

    }).addCase(DELETE_SONG_SUCCESS, (state, action: any) => {
        state.error = undefined;
        state.songs = state.songs.filter((song: ISong) => song._id !== action.payload);

    }).addCase(DELETE_SONG_FAILURE, (state, action: any) => {

        state.error = action.error;
    }).addCase(GET_STATS_SUCCESS, (state, action: any) => {

        state.stats = action.data;
    }).addCase(GET_STATS_FAILURE, (state, action: any) => {

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