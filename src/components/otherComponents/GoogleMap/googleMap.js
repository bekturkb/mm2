import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class GoogleMap extends Component {
    state = {
        center: {
            lat: 41.869223,
            lng: 72.950105
        },
        zoom: 11
    };

    getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.showPosition);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    showPosition = (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude
        console.log('Latitude: ' + lat + '  --  Longitude : ', lng);
        this.setState({center: {lat, lng}})
    };

    componentDidMount() {
        this.getLocation();
    }

    render() {

        console.log('this state center : ', this.state.center)

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '88vh', width: '100%', marginTop: 80 }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyB0jOakuvfduNL38pxj4s71jOIrPNyN5h0' }}
                    defaultCenter={this.state.center}
                    defaultZoom={this.state.zoom}
                >
                    <AnyReactComponent
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMapReact>
            </div>
        );
    }
}

export default GoogleMap;