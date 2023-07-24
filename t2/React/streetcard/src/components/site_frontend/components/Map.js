import React, { Component } from 'react';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      map: null
    };

    this.mapRef = React.createRef();
  }

  componentDidMount() {
    // Load the Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.onload = () => {
      // Initialize the map
      const map = new window.google.maps.Map(this.mapRef.current, {
        center: { lat: this.props.lat, lng: this.props.lng },
        zoom: this.props.zoom
      });

      // Add a marker to the map
      const marker = new window.google.maps.Marker({
        position: { lat: this.props.lat, lng: this.props.lng },
        map: map
      });

      this.setState({ map });
    };
    document.body.appendChild(script);
  }

  componentWillUnmount() {
    // Clean up the Google Maps API script
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.includes('maps.googleapis.com/maps/api/js')) {
        scripts[i].remove();
        break;
      }
    }
  }

  render() {
    return <div ref={this.mapRef} style={{ height: '400px', width: '100%' }} />;
  }
}

export default Map;