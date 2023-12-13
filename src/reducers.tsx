import { createReducer } from "@reduxjs/toolkit";

import { DELETE_SONG_FAILURE, DELETE_SONG_SUCCESS, GET_SONGS_FAILURE, GET_SONGS_SUCCESS, GET_STATS_FAILURE, GET_STATS_SUCCESS, POST_SONG_FAILURE, POST_SONG_SUCCESS, PUT_SONG_SUCCESS, SONG_MODAL_CLOSE, SONG_MODAL_OPEN, THEME_TOGGLE } from "./saga/actions";
import { ISong } from "./components/song/Song";
import { StatsType } from "./store";


type ErrorType = {
    message: string;
    response: {
        data: {
            errors: {
                param: string;
            }[];
        };
    };
};


const initialState = {
    songs: [] as Array<ISong>,
    stats: {} as StatsType,
    selectedSong: undefined,
    error: {} as ErrorType,
    loading: true,
    modal: { showMe: false, data: {} as ISong },
    theme: 'dark'
};


const songReducer = createReducer(initialState, (builder) => {
    builder.addCase(THEME_TOGGLE, (state, action) => {

        if(action.type !== 'THEME/TOGGLE_THEME') return;
        state.theme = state.theme === "dark"?"light":"dark";
    }).addCase(GET_SONGS_SUCCESS, (state, action: any) => {

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
    }).addCase(SONG_MODAL_OPEN, (state, action: any) => {

        console.log(action.payload);
        state.modal = { showMe: true, data: action?.payload?.data || action?.data };
    }).addCase(SONG_MODAL_CLOSE, (state, _) => {

        state.modal = { showMe: false, data: {} as ISong };
    });
});

export default songReducer