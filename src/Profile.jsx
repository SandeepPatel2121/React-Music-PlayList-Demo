import React, { Component } from "react";
import "./App.css"
import token from './Constant'


class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            BASE_URL_PRE: 'https://api.spotify.com/v1/artists/',
            BASE_URL_POST: '/top-tracks?',
            tracks: []
        }
    }

    

    render() {
        let name = '';
        let follower = '';
        let img = '';
        let musicType = '';
        if (this.props.artist !== null) {
            name = this.props.artist.name;
            follower = this.props.artist.followers.total;
            img = this.props.artist.images[0];
            musicType = this.props.artist.genres;

            return (
                <div className="profile" >
                    <div>
                        <img className="profileImg" alt="Profile" src={img.url} />
                    </div>
                    <div className="profile-detail">
                        <div>Artist Name : {name}</div>
                        <div>Follower : {follower}</div>
                        <div>
                            {
                                musicType.map((type, index) => {
                                    return (
                                        <span className="batch" key={index}>{type}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    
                </div>
            );
        } else {
            return (
                <div>
                    <div></div>
                </div>
            );
        }
    }
}

export default Profile;