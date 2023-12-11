import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { Route, Routes, BrowserRouter } from "react-router-dom";

// import './bootstrap.min.css'
import SongList from "./components/song/SongList";
import SongForm from './components/song/SongForm';
import Home from './components/Home';
import MainLayoutProvider from './layouts/MainLayoutProvider';

function App() {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayoutProvider><Home /></MainLayoutProvider>} />
            <Route path="/song" element={<MainLayoutProvider><SongList /></MainLayoutProvider> } />
            <Route path="/edit/song/:songId" element={<MainLayoutProvider><SongForm /></MainLayoutProvider>} />
            <Route path="/new/song" element={<MainLayoutProvider><SongForm /></MainLayoutProvider>} />
          </Routes>
        </BrowserRouter>

      </Provider>
    </React.StrictMode>
  )
}

export default App
