import { useAppSelector, useAppDispatch } from '../../hooks';
import { songsSelector, insertSong, genres, SongType } from './SongSlice';

import { Song } from './Song';

import './../../bootstrap.min.css';
import { ChangeEvent, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';

const SongList = () => {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [album, setAlbum] = useState('');
    const [genre, setGenre] = useState('');

    const songsList = useAppSelector(songsSelector);
    const dispatch = useAppDispatch();

    const onTitleChange = (e: ChangeEvent) => setTitle(e.target.value);
    const onArtistChange = (e: ChangeEvent) => setArtist(e.target.value);
    const onAlbumChange = (e: ChangeEvent) => setAlbum(e.target.value);
    const onGenreChange = (e: ChangeEvent) => setGenre(e.target.value);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newSong: SongType = {
            id: new Date().getMilliseconds(),
            title,
            artist,
            album,
            genre
        } as SongType;

        dispatch(insertSong(newSong));
    };
    
    return (
        <section className='row'>
            <form id="new-song-form" onSubmit={handleSubmit}>
                <div className='form-group'>
                    <div className='col-md-6'>
                        <label className='form-label' 
                            htmlFor='title-input'>Title</label>
                        <input className='form-control' 
                            onChange={onTitleChange} 
                            type='text' 
                            id='title-input' 
                            name='title'/>
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label' htmlFor='artist-input'>Artist</label>
                        <input className='form-control' 
                            onChange={onArtistChange} 
                            type='text' 
                            id='artist-input' 
                            name='artist' />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label' 
                            htmlFor='album-input'>Album</label>
                        <input className='form-control' 
                            onChange={onAlbumChange} 
                            type='text' 
                            id='album-input' 
                            name='album' />
                    </div>
                    <div className='col-md-6'>
                        <label className='form-label' 
                            htmlFor='genre-input'>Genre</label>


                        <select 
                            className='form-control' 
                            name='genre'
                            id='genre-input'
                            onChange={onGenreChange}>
                    
                            {genres.map((genre: string) => (
                                <option key={genre} id={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    <div className='row'></div>

                    <div className='col-md-6'>
                        <button type='submit'>Add</button>
                    </div>
                </div>
            </form>
            
            <ul>
            {songsList.songs.map((s: SongType) => (
                <li key={s.id}>
                    <Song {...s} />
                </li>
            ))}
            </ul>

        </section>
    );
}


export default SongList;