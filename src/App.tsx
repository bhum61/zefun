import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Routes, BrowserRouter } from "react-router-dom";

// import './bootstrap.min.css'
import SongList from "./components/song/SongList";
import { SongForm } from './components/song/SongForm';
import Home from './components/Home';
import MainLayoutProvider from './layouts/MainLayoutProvider';

function App() {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayoutProvider mainPanel={Home} />} />
            <Route path="/song" element={<MainLayoutProvider mainPanel={SongList} />} />
            <Route path="/edit/song/:songId" element={<MainLayoutProvider mainPanel={SongForm} />} />
            <Route path="/new/song" element={<MainLayoutProvider mainPanel={SongForm} />} />
          </Routes>
        </BrowserRouter>

      </Provider>
    </React.StrictMode>
  )
}

export default App
