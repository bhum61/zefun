import { createAction } from "@reduxjs/toolkit";
import { ISong } from "../components/song/Song";
import { useCallback } from "react";

export const GET_SONGS_FETCH = createAction('SONG/GET_SONGS_FETCH');
export const GET_SONGS_SUCCESS = createAction('SONG/GET_SONGS_SUCCESS');
export const GET_SONGS_FAILURE = createAction('SONG/GET_SONGS_FAILURE');

export const POST_SONG_POST = createAction('SONG/POST_SONG_POST', (song: ISong, callback) => {
    
    return {
        payload: song,
        callback
    }
});
export const POST_SONG_SUCCESS = createAction('SONG/POST_SONG_SUCCESS');
export const POST_SONG_FAILURE = createAction('SONG/POST_SONG_FAILURE');

export const DELETE_SONG_DELETE = createAction('SONG/DELETE_SONG_DELETE', (id: string) => {
    console.log("ID", id);

    return {
        payload: id
    }
});

export const PUT_SONG_SUCCESS = createAction('SONG/PUT_SONG_SUCCESS');

export const DELETE_SONG_SUCCESS = createAction('SONG/DELETE_SONG_SUCCESS');
export const DELETE_SONG_FAILURE = createAction('SONG/DELETE_SONG_FAILURE');

export const THEME_TOGGLE = createAction('THEME/TOGGLE_THEME');

export const GET_STATS_SUCCESS = createAction('SONG/GET_STATS_SUCCESS');
export const GET_STATS_FAILURE = createAction('SONG/GET_STATS_FAILURE');