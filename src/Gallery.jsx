import React, { Component } from "react";
import "./App.css"

class Gallery extends Component {

    constructor(props) {
        super(props);

    }

    playAudio(url) {
        let audio = new Audio(url);
        audio.play();
    }

    render() {
        let tracks = [];
        if (this.props.track != null) {
            tracks = this.props.track;
        }
        return (
            <div className="playList">
                {
                    tracks.map((track, index) => {
                        let img = track.album.images[0];
                        console.log(track);
                        return (
                            <div index={index} onClick={() => this.playAudio(track.preview_url)}>
                                <img className="playListImg" alt="Album Img" src={img.url} />
                                <p>{track.name}</p>
                            </div>
                        )
                    })
                }
            </div>

        );

    }
}

export default Gallery;