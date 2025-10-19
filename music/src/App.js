import React, { useState, useEffect } from "react";
import { Route, Routes, BrowserRouter } from 'react-router-dom';
// import { createMemoryHistory } from 'history';
import SearchAlbum from './SearchAlbum';
import NavBar from "./NavBar";
import EditAlbum from './EditAlbum';
import OneAlbum from "./OneAlbum";
import './App.css';
import dataSource from './dataSource';

const App = () => {
    const [searchPhrase, setSearchPhrase] = useState('');
    const [albumList, setAlbumList] = useState ([]);
    const [currentlySelectedAlbumId, setCurrentlySelectedAlbumId] = useState(0);
    let refresh = false;

    const uri = "http://localhost:8080/albums/";

    const loadAlbums = async () => {
        const response = await dataSource.get('/albums');
        
        setAlbumList(response.data);
    }

    // Setup initialization callback
    useEffect(() => {
        // Update the album list
        loadAlbums();
    }, [refresh]);

    const updateSearchResults = async (phrase) => {
        console.log('phrase is ' + phrase);
        setSearchPhrase(phrase);
    }

    const updateSingleAlbum = (id, navigate, edit) => {
        console.log('Update Single Album = ', id);
        console.log('Update Single Album = ', navigate);
        var indexNumber = 0;
        for (var i = 0; i < albumList.length; ++i) {
            if (albumList[i].id === id) indexNumber =i;
        }
        setCurrentlySelectedAlbumId(indexNumber);
        const path = edit ? `/edit/${id}` : `/show/${id}`;
        console.log('Navigating to path:', path);
        navigate(path);
    };

    console.log('albumList', albumList);
    const renderedList = albumList.filter((album) => {
        if (
            album.description.toLowerCase().includes(searchPhrase.toLowerCase()) ||
            searchPhrase === ''
        ) {
            return true;
        }
        return false;
    });

    console.log('renderedList', renderedList);

    const onEditAlbum = (navigate) => {
        loadAlbums();
        navigate('/');
    }

    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route
                    exact
                    path='/'
                    element={
                        <SearchAlbum
                            updateSearchResults={updateSearchResults}
                            albumList={renderedList}
                            updateSingleAlbum={updateSingleAlbum}
                        />
                    }
                />
                <Route exact path='/new' element={<EditAlbum onEditAlbum={onEditAlbum}/>}/>
                <Route exact path='/edit/:albumId' element={<EditAlbum onEditAlbum={onEditAlbum} album={albumList[currentlySelectedAlbumId]}/>} />
                <Route
                    exact
                    path='/show/:albumId'
                    element={<OneAlbum album={albumList[currentlySelectedAlbumId]}/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
