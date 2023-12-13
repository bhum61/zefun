import { call, put, takeEvery } from "redux-saga/effects";
import axios from "axios"
import { DELETE_SONG_DELETE, DELETE_SONG_FAILURE, DELETE_SONG_SUCCESS, GET_SONGS_FAILURE, GET_SONGS_SUCCESS, GET_STATS_FAILURE, GET_STATS_SUCCESS, POST_SONG_FAILURE, POST_SONG_POST, POST_SONG_SUCCESS, PUT_SONG_SUCCESS, SONG_MODAL_OPEN, SONG_MODAL_CLOSE, THEME_TOGGLE } from "./actions";
import { ISong } from "../components/song/Song";
import { StatsType } from "../store";

const API_BASE_URL = 'http://localhost:5000/api';

const axiosHeaders = {
    'X-ZEFUN-API-KEY':'qwertasdf'
};

const songsFetch = () => {
    return axios.get(`${API_BASE_URL}/song`, {
        headers: axiosHeaders      
    }).then((res) => {

        return res.data;
    }).catch((err) => {
        throw err;
    })
}

const songsFetchStats = () => {
    return axios.get(`${API_BASE_URL}/stats`, {
        headers: axiosHeaders      
    }).then((res) => {

        return res.data;
    }).catch((err) => {
        throw err;
    })
}

const postSong = (song: ISong) => {

    console.log(song);
    const axiosMethod = song._id?axios.put<ISong>:axios.post<ISong>;

    return axiosMethod(`${API_BASE_URL}/song${(song._id && '/'+song._id) || ''}`, song, {
        headers: axiosHeaders
    }).then((res: {data: ISong}) => {


        return res.data;
    }).catch((error) => {
                
        throw error;
    });
}


const deleteSong = (id: string) => {

    return axios.delete(`${API_BASE_URL}/song/${id}`, {
        headers: axiosHeaders
    }).then((res) => {

        return res.data;
    }).catch((error) => {

        throw error;
    });
}

function* deleteSongGen({payload}:{payload: string}) {

    try {

        console.log(payload);
        yield call(deleteSong, payload);

        yield put({type: DELETE_SONG_SUCCESS, payload});
    } catch (error) {

        console.log(error);
        yield put({type: DELETE_SONG_FAILURE, error});
    }
}


function* postSongGen({payload}: {payload: ISong}) {
    try {

        const createdSong: ISong = yield call(postSong, payload);

        if(payload._id) yield put({type: PUT_SONG_SUCCESS, song: createdSong});
        else yield put({type: POST_SONG_SUCCESS, song: createdSong})

    } catch (error) {

        console.log(error);
        yield put({type: POST_SONG_FAILURE, error});
    }
}


function* getSongsFetchGen() {
    try {
        const songs: ISong[] = yield call(songsFetch);
        
        yield put({type: GET_SONGS_SUCCESS, songs});
    } catch (error) {
        
        console.log(error);
        yield put({type: GET_SONGS_FAILURE, error});
    }
}


function* toggleTheme() {

    yield put({type: THEME_TOGGLE});
}


function* getStatsGen() {
    try {
        const data: StatsType = yield call(songsFetchStats);

        yield put({type: GET_STATS_SUCCESS, data});
    } catch (error) {

        yield put({type: GET_STATS_FAILURE, error});
    }
}

function* watchModal({payload}: {payload: {data: ISong, showMe: boolean}}) {

    yield put({type: SONG_MODAL_OPEN, data: payload?.data});
}

function* closeModal() {
    
    yield put({type: SONG_MODAL_CLOSE});
}


function* mySaga() {
    //load initial data
    yield call(getSongsFetchGen);
    yield call(getStatsGen);


    yield takeEvery(POST_SONG_POST, postSongGen);
    yield takeEvery(DELETE_SONG_DELETE, deleteSongGen);
    yield takeEvery(THEME_TOGGLE, toggleTheme);
    yield takeEvery(SONG_MODAL_OPEN, watchModal);
    yield takeEvery(SONG_MODAL_CLOSE, closeModal);
}


export default mySaga;