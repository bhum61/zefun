import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";
import { faHome, faMusic, faUser, faGuitar, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { THEME_TOGGLE } from "../../saga/actions";
import { Link } from "react-router-dom";

const StyledNav = styled.div`
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.color};
    height: 100vh;
    `
    // position: fixed;
    // display: flex;

const StyledList = styled.ul `
    margin: 0;
    padding: 0.5rem;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    list-style: none;
    display: flex;

    a {
        color: ${props => props.theme.color};;
        text-decoration: none;
    }

`

const StyledLI = styled.li `
    width: 100%;
    display: flex;
    align-items: center;
    height: 2rem;
    margin-bottom: 1rem;
    transition: width 200ms ease;
    filter: grayscale(100%) opacity(1);


    svg {
        height: 100%;
        color: ${props => props.theme.textColor}
    }

    &:hover {
        filter: grayscale(0%) opacity(1);
        color: ${props => props.theme.textColor};
    }

    &:last-child {
        margin-top: auto;
    }


`

const StyledLabel = styled.label `
    margin-left: 1rem;
    display: none;

    ${StyledList}:hover & {
        display: block;
    }
`



export default () => {

    const selectedTheme = useAppSelector((state) => state.rootReducer.songReducer.theme);
    const dispatch = useAppDispatch();

    const toggleTheme = () => {
        const action = THEME_TOGGLE();
        dispatch(action);
    }

    return (
        <>
            <StyledNav>

                <StyledList>
                    <Link to='/'>
                        <StyledLI><FontAwesomeIcon icon={faHome} />
                            <StyledLabel>Home</StyledLabel>
                        </StyledLI>
                    </Link>

                    <Link to='/song'>
                        <StyledLI>
                            <FontAwesomeIcon icon={faMusic} />
                            <StyledLabel>Songs</StyledLabel>
                        </StyledLI>
                    </Link>
                    
                    <Link to='/'>
                        <StyledLI>
                            <FontAwesomeIcon icon={faUser} />
                            <StyledLabel>Artists</StyledLabel>
                        </StyledLI>
                    </Link>

                    <Link to='/'>
                        <StyledLI>
                            <FontAwesomeIcon icon={faGuitar} />
                            <StyledLabel>Genre</StyledLabel>
                        </StyledLI>
                    </Link>
                    <StyledLI onClick={toggleTheme}>
                        <FontAwesomeIcon icon={faMoon} />
                        <StyledLabel>{selectedTheme}</StyledLabel>
                    </StyledLI>
                </StyledList>
            </StyledNav>
        </>
    );
}