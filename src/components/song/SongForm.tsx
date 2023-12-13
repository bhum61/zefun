import { ISong, genres } from "./Song";
import { useAppSelector } from "../../hooks";
import { POST_SONG_POST } from "../../saga/actions";
import { styled } from "styled-components";
import { ChangeEventHandler, useState } from "react";
import { useDispatch } from "react-redux";

const StyledDiv = styled.div`
display: flex;
flex-wrap: wrap;
flex-basis: 50%;
justify-content: center;
background-color: ${props => props.theme.modalBackgroundColor};
padding: 1em;
border: 1px solid #ccc;
border-radius: 5px;

.error {
    flex-basis: 100%;
    border: 1px solid red;
}

.error-txt {
    color: red;
}
`

const StyledForm = styled.form `
display: flex;
flex-basis: 100%;
flex-wrap: wrap;

div {
    display: flex;
}

label, input, button, select {
    flex-basis: 100%;
}

input, button, select {
    border: none;
    border-radius: 3px;
    height: 2em;
    margin-bottom: 1em;
    background-image: linear-gradient(to right, #290035, #360145, #440255, #530366, #620478);
    color: #fff;
    font-weight: bold;
    padding: 0.5em;
}

select option {
    color: #000;
    font-weight: bold;
    height: 2em;
    padding: 0.5em;
    margin-bottom: 1em;
}


button {
    &:hover {
        background-color: #22AA00;
    }
}
`


const SongForm = ({selectedSongId = ''}) => {
    console.log("SelectedSongId: ", selectedSongId);

    const dispatch = useDispatch();
    
    const error = useAppSelector(state => state.rootReducer.songReducer.error);
    const selectedSong = useAppSelector<ISong | undefined>(state => state.rootReducer.songReducer.songs
        .find((song: ISong) => song._id === selectedSongId));

    const [_id, _] = useState(selectedSong?._id);
    const [title, setTitle] = useState(selectedSong?.title);
    const [artist, setArtist] = useState(selectedSong?.artist);
    const [album, setAlbum] = useState(selectedSong?.album);
    const [genre, setGenre] = useState(selectedSong?.genre || genres[0]);

    const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => setTitle(e.target?.value);
    const onArtistChange: ChangeEventHandler<HTMLInputElement> = (e) => setArtist(e.target?.value);
    const onAlbumChange: ChangeEventHandler<HTMLInputElement> = (e) => setAlbum(e.target?.value);
    const onGenreChange: ChangeEventHandler<HTMLSelectElement> = (e) => setGenre(e.target?.value);

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
        
        dispatch(action);
    };


    const errorInputs = error?.response?.data?.errors?.map((err) => {

        return err?.param;
    });


    return (
            <StyledDiv>
                <>
                    {error &&
                        <span>
                            <p className="error-txt">{error.message}</p>
                        </span> 
                    }
                </>
            <StyledForm id="new-song-form"  
                onSubmit={handleSubmit}>
                        <input hidden={true}
                            type='text'
                            id='id-input'
                            name='_id'
                            readOnly={true}
                            defaultValue={_id} />

                        <label htmlFor='title-input'>
                            Title
                            <br/>
                            <small 
                                hidden={
                                    !errorInputs?.includes('title')
                                }
                                className="error-txt" >
                                please enter valid title
                            </small>
                        </label>

                        <input
                            onChange={onTitleChange} 
                            type='text' 
                            id='title-input' 
                            name='title'
                            className={
                                errorInputs?.includes('title')?'error':''
                            }
                            value={title}/>

                        <label htmlFor='artist-input'>
                            Artist
                            <br/>
                            <small
                                hidden={
                                    !errorInputs?.includes('artist')
                                } 
                                className="error-txt">please enter valid artist</small>
                        </label>
                        <input 
                            onChange={onArtistChange} 
                            type='text' 
                            id='artist-input' 
                            name='artist'
                            className={
                                errorInputs?.includes('artist')?'error':''
                            }
                            value={artist} />
                        <label
                            htmlFor='album-input'>
                                Album
                                <br/>
                            <small 
                                hidden={
                                    !errorInputs?.includes('album')
                                }
                                className="error-txt">please enter valid album</small>
                        </label>
                        <input 
                            onChange={onAlbumChange} 
                            type='text' 
                            id='album-input' 
                            name='album'
                            className={
                                errorInputs?.includes('album')?'error':''
                            }
                            value={album} />

                        <label 
                            htmlFor='genre-input'>
                            Genre
                        </label>

                        <select 
                            name='genre'
                            id='genre-input'
                            onChange={onGenreChange}
                            defaultValue={genre}>
                    
                            {genres && genres.map((genre: string) => (
                                <option 
                                    key={genre} 
                                    id={genre} 
                                    value={genre}>

                                        {genre}
                                </option>
                            ))}
                        </select>
                        <hr/>

                        <button type='submit'>
                            {selectedSong?'Update':'Add'}
                        </button>
            </StyledForm>
        </StyledDiv>
    )
};


export default SongForm;