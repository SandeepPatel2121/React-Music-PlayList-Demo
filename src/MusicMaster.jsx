import React, { Component } from "react";
import { FormGroup, FormControl, InputGroup, Button } from 'react-bootstrap';
import { MDBCol, MDBIcon } from "mdbreact";
import Profile from "./Profile";
import Gallery from './Gallery';
import token from './Constant'
import './App.css';

class MusicMaster extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            searchType: 'artist',
            BASE_URL: 'https://api.spotify.com/v1/search?',
            artist: null,
            BASE_URL_PRE: 'https://api.spotify.com/v1/artists/',
            BASE_URL_POST: '/top-tracks?',
            tracks: []
        }
    }

    getSearchText() {

        let FETCH_URL = `${this.state.BASE_URL}q=${this.state.searchText}&type=${this.state.searchType}`;

        let header = {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            mode: "cors"
        }

        fetch(FETCH_URL, header)
            .then(response => response.json())
            .then(json => {
                if (json.artists.items.length > 0) {
                    let data = json.artists.items[0];
                    this.setState({
                        artist: data
                    })
                    this.getAllTracks(data.id);
                } else {
                    alert("Artist Not Found");
                }
            })

            

    }

    getAllTracks() {
        let artistId = this.state.artist.id;
        let FETCH_URL = `${this.state.BASE_URL_PRE}${artistId}${this.state.BASE_URL_POST}country=IN`;

        let header = {
            method: "GET",
            headers: {
                "Authorization": 'Bearer ' + token
            },
            mode: "cors"
        }

        fetch(FETCH_URL, header)
            .then(response => response.json())
            .then(json => {
                if (json.tracks.length > 0) {
                    const {tracks} = json;
                    this.setState({tracks})
                } else {
                    alert("Tracks Not Found");
                }
            })
    }

    render() {
        return (
            <div className="App">
                <div className="App-title">Music Master</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl type="text" onChange={(event) => this.setState({ searchText: event.target.value })} placeholder="Search for an artist..." onKeyPress={(event) => {
                            if (event.key == 'Enter') {
                                alert(this.state.searchText);
                            }
                        }} />
                    </InputGroup>
                    <Button variant="primary" onClick={() => this.getSearchText()}>Search</Button>
                </FormGroup>
                <div>
                    <Profile artist={this.state.artist} onClick={() => this.getAllTracks()}/>
                </div>
                <div>
                    <Gallery className="row" track={this.state.tracks}/>   
                </div>
            </div>

        );
    }
}

export default MusicMaster;