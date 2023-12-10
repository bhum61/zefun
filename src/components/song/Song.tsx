import React from "react";

import { useAppDispatch } from "../../hooks";
import { DELETE_SONG_DELETE } from "../../saga/actions";
import { Link } from "react-router-dom";
import { faTrash, faPen, faPlay } from "@fortawesome/free-solid-svg-icons";
import { styled } from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export interface ISong {
    _id: string;
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

const StyledSong = styled.div `
    display: flex;
    border-bottom: 1px solid #CCC;

    span {
        padding-right: 1em;
        display: flex;
        align-items: center;
    }
`
    
const StyledSpan = styled.span `
    
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    gap: 1em;
    padding-left: 4em;
    // margin-right: auto;
    
    
    svg {
        color: ${props => props.theme.color};
    }

    svg:hover {
        color: ${props => props.theme.textColor};;
    }
`

export const Song: React.FC<ISong> = ({_id, title, artist}) => {

    const dispatch = useAppDispatch();

    const deleteHandler = (id: string) => {
        const action = DELETE_SONG_DELETE(id);

        
        dispatch(action);
    }
    
    return (        
        <StyledSong>
            <span>
                <FontAwesomeIcon icon={faPlay} />
            </span>
            <h4>{title} by <small>{artist}</small></h4>
       
            <StyledSpan>

                <Link to={`/edit/song/${_id}`}><FontAwesomeIcon icon={faPen}  /></Link>
                {/* <button className='btn btn-info' onClick={() => editHandler(_id)}>Edit</button> */}
                <Link to='#' onClick={() => deleteHandler(_id)}>
                    <FontAwesomeIcon icon={faTrash} />
                </Link>

            </StyledSpan>
        </StyledSong>
    );
}