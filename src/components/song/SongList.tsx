import { useAppDispatch, useAppSelector } from '../../hooks';
import { ISong } from './Song';
import { Song } from './Song';

import { styled } from 'styled-components';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SONG_MODAL_OPEN } from '../../saga/actions';


const StyledButton = styled.button `
    border: 1px solid #ccc;
    border-radius: 5px;
    background: none;
    color: ${props => props.theme.color};

    padding: 0.5em;
    text-decoration: none;

    svg {
        padding-left: 0.5em;
    }
`



const StyledSection = styled.section `
flex-basis: 100%;

ul {
    padding: 0;
    list-style: none;
}
`


const SongList = () => {    
    const songsList = useAppSelector((state) => { return state.rootReducer.songReducer.songs;});
    const error = useAppSelector((state) => {return state.rootReducer.songReducer.error;});

    const dispatch = useAppDispatch();

    const showModal = (song: ISong) => {

        const action = SONG_MODAL_OPEN({show: true, data: song});
        console.log("SHOW MODAL", action);
        dispatch(action);
    }

    return (
        <StyledSection>
            { error?.message && <p>Error: {error.message}</p>}

            <StyledButton onClick={() => showModal({} as ISong)}>
                New
                <FontAwesomeIcon icon={faPlusSquare} />
            </StyledButton>
 
            <ul>
                {songsList.map((s: ISong) => (
                    <li key={s._id}>
                        <Song {...s} />
                    </li>
                ))}
            </ul>

        </StyledSection>
    );
}


export default SongList;