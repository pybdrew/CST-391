import React from "react";
import Card from "./Card";
import { useNavigate } from "react-router-dom";

const AlbumList = (props) => {

    const navigator = useNavigate();
    const handleSelectionOne = (albumId) => {
        console.log('Selected ID is ' + albumId);
        props.onClick(albumId, navigator);
    };

    console.log('props albumList', props);
    const albums = props.albumList.map((album, index) => {
        return (
            <Card
                key={album.id || index}
                albumId={album.id}
                albumTitle={album.title}
                albumDescription={album.description}
                buttonText='OK'
                imgURL={album.image}
                onClick={handleSelectionOne}
            />
        );
    });
    return <div className='container'>{albums}</div>
}

export default AlbumList;1
