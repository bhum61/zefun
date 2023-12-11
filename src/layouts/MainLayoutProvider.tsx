import styled, { ThemeProvider } from "styled-components"
import NavBar from "../components/navbar/NavBar";
import { useAppSelector } from "../hooks";
import React from "react";


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
    display: flex;
    flex-basis: 100%;;
    flex-direction: row;
    gap: 1em;
    align-content: space-between;
    flex-wrap: wrap;
    justify-content: center;
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


export default ({children}: LayoutProps) => {

    const selectedTheme: string = useAppSelector((state) => state.rootReducer.themeReducer.theme);

    console.log("Selected theme: ", selectedTheme);

    const currentTheme = selectedTheme === 'dark'? theme.dark : theme.light;
    return (
        <ThemeProvider theme={currentTheme}>
            <Container>

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