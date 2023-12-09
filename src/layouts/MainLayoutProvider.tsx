import styled, { ThemeProvider } from "styled-components"
import NavBar from "../components/navbar/NavBar";
import { useAppSelector } from "../hooks";


const Container = styled.div`
    display: flex;
    background-color: ${props => props.theme.backgroundColor};
    color: ${props => props.theme.textColor};
`


const Pane = styled.div`
    flex: ${props => props.weight};
    flex-direction: row;
    display: flex;
    gap: 1em;
    align-content: space-between;
    flex-wrap: wrap;
    height: fit-content;
`

const theme = {
    dark: {
        backgroundColor: "#000",
        color: "#fff",
        textColor: "#6600FF"
    },

    light: {
        backgroundColor: "#fff",
        color: "#000",
        textColor: "#6600FF"
    }
};

export default ({mainPanel: MainPanel}) => {

    const selectedTheme = useAppSelector((state) => state.rootReducer.themeReducer.theme);

    console.log("Selected theme: ", selectedTheme);

    return (
        <ThemeProvider theme={theme[selectedTheme]}>
            <Container>

                <Pane weight='0.5'>
                    <NavBar />
                </Pane>

                <Pane weight='8'>
                    <MainPanel/>
                </Pane>

            </Container>
        
        </ThemeProvider>
    );
}