import React from 'react';
import { store } from './store';
import { Provider } from 'react-redux';

// import './bootstrap.min.css'
import SongList from "./components/song/SongList";

function App() {

  return (
    <React.StrictMode>
      <Provider store={store}>
        <SongList />
      </Provider>
    </React.StrictMode>
  )
}

export default App
