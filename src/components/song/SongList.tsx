import { useAppSelector } from '../../hooks';
import { ISong } from './Song';
import { Song } from './Song';

import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StyledLink = styled(Link) `
    border: 1px solid #ccc;
    border-radius: 5px;

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

    return (
        <StyledSection>
            { error && <p>Error: {error.message || "Unknown error"}</p>}


            <StyledLink to='/new/song/'>
                New
                <FontAwesomeIcon icon={faPlusSquare} />
            </StyledLink>
 
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