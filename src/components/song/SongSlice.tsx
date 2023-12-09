import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from './../../store';



const initialState : {songs: Array<ISong>} = {
    songs: [
    ]
};

const songSlice = createSlice({
    name: 'songs',
    initialState,

    reducers: {
        insertSong: (state, action: PayloadAction<ISong>) => {
            state.songs.push(action.payload);
        },
        updateSong: (state) => {

        },
        deleteSong: (state, action: PayloadAction<number>) => {
            console.log(action);

            state.songs.map((song: ISong) => song.id !== action.payload);
        },
        editSong: (state) => {

        }
    }
});

export const {insertSong, updateSong, deleteSong} = songSlice.actions;

export const songsSelector = (state: RootState) => state.songReducer;
export default songSlice.reducer;