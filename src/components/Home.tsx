import { styled } from "styled-components"
import SongList from "./song/SongList"
import { useAppSelector } from "../hooks"


const StyledDiv = styled.div`
height: fit-content;
`


const StyledBox = styled.div `
border: 1px solid #ccc;
border-radius: 1px;
flex: 1;
flex-wrap: wrap;
block-size: fit-content;
padding: 1rem;
background-color: ${props => props.theme.backgroundColor};
color: ${props => props.theme.textColor};

h3 {
    font-style: bald;
}
`

export default () => {

    const stats = useAppSelector((state) => state.rootReducer.songReducer.stats);
    const {count: songsCount, albums: albumsCount, artists: artistsCount, genres: genreCount } = stats?.stats?stats.stats[0]:{};

    return (
        <>
            <>
                <StyledBox>
                    <h1>{songsCount || 0}+</h1>
                    <hr/>
                    <h4>Songs</h4>
                </StyledBox>
                <StyledBox>
                    <h1>{artistsCount || 0}+</h1>
                    <hr/>
                    <h4>Artists</h4>
                </StyledBox>
                <StyledBox>
                    <h1>{albumsCount || 0}+</h1>
                    <hr/>
                    <h4>Albums</h4>
                </StyledBox>
                <StyledBox>
                    <h1>{genreCount || 0}+</h1>
                    <hr/>
                    <h4>Genres</h4>
                </StyledBox>
            </>
            <>
            
                <SongList />
            </>    

        </>
    )
}