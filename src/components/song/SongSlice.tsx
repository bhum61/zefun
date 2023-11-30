import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from './../../store';

export interface SongType {
    id: number;
    title: string;
    artist: string;
    album: string;
    genre: string;    
} 


export const genres: Array<string> = [
    "Eskita",
    "Guayla",
    "Regeda",
    "Tezita",
    "Anchihoye",
    "Bati",
    "Ambassel",
]

const initialState : {songs: Array<SongType>} = {
    songs: [
        {
            id: 7,
            title: "Welloyewa",
            artist: "Seyumkal Gebre",
            album: "2015",
            genre: "Eskita"
        },
    ]
};

const songSlice = createSlice({
    name: 'songs',
    initialState,

    reducers: {
        insertSong: (state, action: PayloadAction<SongType>) => {
            state.songs.push(action.payload);
        },
        updateSong: (state) => {

        },
        deleteSong: (state, action: PayloadAction<number>) => {
            console.log(action);

            state.songs.map((song: SongType) => song.id !== action.payload);
        },
        editSong: (state) => {

        }
    }
});

export const {insertSong, updateSong, deleteSong} = songSlice.actions;

export const songsSelector = (state: RootState) => state.songReducer;
export default songSlice.reducer;