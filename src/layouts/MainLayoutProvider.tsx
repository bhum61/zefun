import styled, { ThemeProvider } from "styled-components"
import NavBar from "../components/navbar/NavBar";
import { useAppDispatch, useAppSelector } from "../hooks";
import React from "react";
import SongForm from "../components/song/SongForm";
import { SONG_MODAL_CLOSE } from "../saga/actions";


const Container = styled.div`
    display: flex;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
`


const Pane = styled.div<{weight: string}>`
    flex: ${props => props.weight || '1'};
    flex-direction: row;
    display: flex;
    gap: 1em;
    align-content: space-between;
    flex-wrap: wrap;
    height: fit-content;
`

const ModalCenter = styled.div`
    position: absolute;
    display: flex;
    flex-basis: 100%;;
    flex-direction: row;
    gap: 1em;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 0.75rem;
    width: 40%;
    z-index: 1;
`

const StyledModalWindow = styled.div`
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white 0.75;
    backdrop-filter: blur(8px);
    animation: fadein 1.5s;

    @keyframes fadein {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`

const theme = {
    dark: {
        backgroundColor: "#040D12",
        modalBackgroundColor: "#000",
        color: "#fff",
        textColor: "#C312EB"
    },

    light: {
        backgroundColor: "#fff",
        modalBackgroundColor: "#fff",
        color: "#0055CC",
        textColor: "#000"
    }
};

type LayoutProps = {
    children: React.ReactNode
}


const ModalWindow = ({children}: LayoutProps) => {
    const dispatch = useAppDispatch();
    const closeAction = SONG_MODAL_CLOSE();

    return (
        <StyledModalWindow onClick={() => dispatch(closeAction)}>
            <ModalCenter onClick={e => e.stopPropagation()}>
                {children}
            </ModalCenter>
        </StyledModalWindow>
    )
}


const SongModal = () => {
    const modal = useAppSelector((state) => state.rootReducer.songReducer.modal);

    return  (
        <>
        {
            modal.showMe &&

            <ModalWindow>
                <SongForm selectedSongId={modal?.data?._id}/> 
            </ModalWindow>
        }
        </>
    )
}


export default ({children}: LayoutProps) => {

    const selectedTheme: string = useAppSelector((state) => state.rootReducer.songReducer.theme);

    console.log("Selected theme: ", selectedTheme);

    const currentTheme = selectedTheme === 'dark'? theme.dark : theme.light;
    return (
        <ThemeProvider theme={currentTheme}>
            <Container>
                <SongModal />
                <Pane weight='0.5'>
                    <NavBar />
                </Pane>

                <Pane weight='8'>
                    {children}
                </Pane>

            </Container>
        </ThemeProvider>
    );
}

export { Pane, ModalCenter }