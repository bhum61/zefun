import React from "react";
import { deleteSong, SongType } from "./SongSlice";

import { useAppDispatch } from "../../hooks";

export const Song: React.FC<SongType> = ({id, title, artist}) => {

    const dispatch = useAppDispatch();

    const deleteHandler = (id: number) => {
        
        dispatch(deleteSong(id));
    }

    return <div key={id}>
        <h3>{title}</h3>
        <p>{artist}</p>
        <>
            <button className='btn btn-info'>Edit</button>
            <button className='btn btn-danger' onClick={() => deleteHandler(id)}>Delete</button>
        </>
    </div>;
}