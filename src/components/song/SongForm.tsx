import { useState } from "react";
import { ISong, genres } from "./Song";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { POST_SONG_POST } from "../../saga/actions";
import { useParams } from "react-router-dom";

export const SongForm = () => {
    const { songId } = useParams();

    const dispatch = useAppDispatch();
    
    const error = useAppSelector((state) => {return state.rootReducer.songReducer.error;});
    const selectedSong = useAppSelector((state) => { return state.rootReducer.songReducer.songs.find((song: ISong) => song._id === songId);}) as ISong;


    const [_id, _] = useState(songId);
    const [title, setTitle] = useState(selectedSong?.title);
    const [artist, setArtist] = useState(selectedSong?.artist);
    const [album, setAlbum] = useState(selectedSong?.album);
    const [genre, setGenre] = useState(selectedSong?.genre || genres[0]);


    console.log("SELECTED SONG: ", songId, selectedSong);

    const errorParams = ['title','genre'];

    const onTitleChange = (e: ChangeEvent) => setTitle(e.target.value);
    const onArtistChange = (e: ChangeEvent) => setArtist(e.target.value);
    const onAlbumChange = (e: ChangeEvent) => setAlbum(e.target.value);
    const onGenreChange = (e: ChangeEvent) => setGenre(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSong: ISong = {
            _id,
            title,
            artist,
            album,
            genre
        } as ISong;

        const action = POST_SONG_POST(newSong);

        // console.log(action);
        dispatch(action);
    };

    return (
        <div>
        { error?.response?.data?.errors && 
                    
            error.response.data.errors.map((err) => {
                return <p>{err.msg}</p>
            })
        }

        <form id="new-song-form" className={`form-group ${errorParams ? 'has-error' : ''}`} 
                onSubmit={handleSubmit}>
                <div className='col-md-6'>
                    <label className='form-label' 
                        htmlFor='title-input'>Title</label>
                    <input hidden={true}
                        type='text'
                        id='id-input'
                        name='_id'
                        value={selectedSong?._id} />

                    <input className='form-control' 
                        onChange={onTitleChange} 
                        type='text' 
                        id='title-input' 
                        name='title'
                        value={selectedSong?.title}/>
                </div>
                <div className='col-md-6'>
                    <label className='form-label' htmlFor='artist-input'>Artist</label>
                    <input className='form-control' 
                        onChange={onArtistChange} 
                        type='text' 
                        id='artist-input' 
                        name='artist'
                        value={selectedSong?.artist} />
                </div>
                <div className='col-md-6'>
                    <label className='form-label' 
                        htmlFor='album-input'>Album</label>
                    <input className='form-control' 
                        onChange={onAlbumChange} 
                        type='text' 
                        id='album-input' 
                        name='album'
                        value={selectedSong?.album} />
                </div>
                <div className='col-md-6'>
                    <label className='form-label' 
                        htmlFor='genre-input'>Genre</label>

                    <select 
                        className='form-control' 
                        name='genre'
                        id='genre-input'
                        onChange={onGenreChange}
                        value={selectedSong?.genre}>
                
                        {genres && genres.map((genre: string) => (
                            <option 
                                key={genre} 
                                id={genre} 
                                value={genre}>

                                    {genre}
                            </option>
                        ))}
                    </select>
                </div>

                <div className='row'></div>

                <div className='col-md-6'>
                    <button type='submit'>{selectedSong?'Update':'Add'}</button>
                </div>
        </form>
    </div>
    )
};