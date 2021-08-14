import React, { Component } from 'react';
import GoogleMap from 'google-map-react';
import axios from 'axios';
import Pusher from 'pusher-js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const mapStyles = {
  width: '100%',
  height: '100%',
}

const markerStyle = {
  height: '25px',
  width: '100px',
  marginTop: "-50px"
}

const imgStyle = {
  height: '100%'
}

const Marker = ({ title }) => (
  <div style={markerStyle}>
    <img style={imgStyle} alt={title} src="data:image/svg+xml;base64,PHN2ZyBpZD0iQ2FwYV8xIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCA1MTIgNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGc+PGNpcmNsZSBjeD0iMjU2IiBjeT0iMjcxIiByPSIxNSIvPjxwYXRoIGQ9Im0yNTYgMGMtMTQwLjk1OCAwLTI1NiAxMTUuMDQ5LTI1NiAyNTYgMCAxNDAuOTYxIDExNS4wNDkgMjU2IDI1NiAyNTYgMTQwLjk2IDAgMjU2LTExNS4wNDkgMjU2LTI1NiAwLTE0MC45NTgtMTE1LjA0OS0yNTYtMjU2LTI1NnptMCA2MWM5Ny4zMjMgMCAxNzguMjE5IDcxLjY2OCAxOTIuNjkyIDE2NWgtNTIuMDE5Yy0zMi45ODIgMC02NC4zMTgtMTMuMjM1LTg1Ljk3My0zNi4zMTEtMjkuNi0zMS41NDYtNzkuNzk3LTMxLjU1Ni0xMDkuNC0uMDAxLTIxLjY1NSAyMy4wNzctNTIuOTkxIDM2LjMxMi04NS45NzQgMzYuMzEyaC01Mi4wMThjMTQuNDczLTkzLjMzMiA5NS4zNjktMTY1IDE5Mi42OTItMTY1em0wIDI1NWMtMjQuODEyIDAtNDUtMjAuMTg2LTQ1LTQ1czIwLjE4OC00NSA0NS00NWMyNC44MTQgMCA0NSAyMC4xODYgNDUgNDVzLTIwLjE4NiA0NS00NSA0NXptLTE4MS41OCAxMS4wOTdjMTcuMTctNi43MzYgMjkuNTY4LTExLjA5NyA0Ni41OC0xMS4wOTcgNTQuNjg4IDAgOTcuMjE5IDQ4LjczNCA4OC45ODEgMTAzLjQ5aC0uMDM1Yy0xLjIyNCA4LjM4MS0zLjYzMiAxNi41MDItNy4xMDUgMjQuMTQ1LTU4Ljc1OS0xNi42Ny0xMDYuMzEtNjAuMjYyLTEyOC40MjEtMTE2LjUzOHptMjM0Ljc1MSAxMTYuNTM0Yy0zLjU2OC03Ljg0NS01LjkyNC0xNS45NjUtNy4xMTctMjQuMTQxaC0uMDM1Yy05LjU5OS02My44MDUgNDkuMzAxLTExNi40NTIgMTEwLjM1NC0xMDAuOTM2IDYuNDM2IDEuNjM2IDE0LjQ5IDQuMzQgMjUuMjA2IDguNTQ0LTIyLjEwOSA1Ni4yNzEtNjkuNjU1IDk5Ljg2MS0xMjguNDA4IDExNi41MzN6Ii8+PC9nPjwvc3ZnPg==" />
    <h3>{title}</h3>
  </div>
);
class AdminMap extends Component {
  constructor(props) {
    super(props)

    this.state = {
      center: { lat: 33.6804228, lng: -73.027363 },
      locations: {},
      users_online: {},
      current_user: ''
    }
  }

  componentDidMount() {
    let pusher = new Pusher('4ed9a1a82fd33a9ba57e', {
      authEndpoint: "https://tracking-mern.herokuapp.com/pusher/auth",
      cluster: "ap1"
    });

    this.presenceChannel = pusher.subscribe('presence-channel');
    this.presenceChannel.bind('pusher:subscription_succeeded', members => {
      this.setState({
        users_online: members.members,
        current_user: members.myID
      });
      this.getLocation();
      this.notify();
    });

    this.presenceChannel.bind('location-update', body => {
      this.setState((prevState, props) => {
        const newState = { ...prevState };
        newState.locations[`${body.username}`] = body.location;
        console.log("new location updated successfully: "+body.username);
        return newState;
      });
    });

    this.presenceChannel.bind('pusher:member_removed', member => {
      this.setState((prevState, props) => {
        const newState = { ...prevState };
        // remove member location once they go offline
        delete newState.locations[`${member.id}`];
        // delete member from the list of online users
        delete newState.users_online[`${member.id}`];

        return newState;
      })
      this.notify();
    })

    this.presenceChannel.bind('pusher:member_added', member => {
      this.notify();
    })
  }

  getLocation = () => {
    if ("geolocation" in navigator) {
      // get the longitude & latitude then update the map center as the new user location
      navigator.geolocation.watchPosition(position => {
        let location = { lat: position.coords.latitude, lng: position.coords.longitude };

        this.setState((prevState, props) => {
          let newState = { ...prevState };

          newState.center = location;
          newState.locations[`${prevState.current_user}`] = location;

          return newState;
        });

        axios.post("https://tracking-mern.herokuapp.com/update-location", {
          username: this.state.current_user,
          location: location
        }).then(res => {
          if (res.status === 200) {
            
          }
        });
      })
    } else {
      alert("Sorry, geolocation is not available on your device. You need that to use this app");
    }
  }

  notify = () => toast(`Drivers online : ${Object.keys(this.state.users_online).length-1}`, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    type: 'info'
  });

  render() {
    var locationMarkers = Object.keys(this.state.locations).map((username, id) => {
      if(username != this.state.current_user){
      return (
          <Marker
          key={id}
          title={username}
          lat={this.state.locations[`${username}`].lat}
          lng={this.state.locations[`${username}`].lng}
        >
        </Marker>

      );
    }

    });

    return (
      <div>
        <GoogleMap
          style={mapStyles}
          bootstrapURLKeys={{ key: ' ' }}
          center={this.state.center}
          zoom={10}
        >
          {locationMarkers}
        </GoogleMap>
        <ToastContainer />
      </div>
    )
  }
}

export default AdminMap;