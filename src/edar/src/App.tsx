import React, { Component } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <RestaurantList />
    </div>
  );
}

class RestaurantList extends Component {
  state = {
    latitude: null,
    longitude: null,
    isLoaded: false,
  };

  // 経度緯度情報を取得
  getLocationInfo() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude, isLoaded: true });
      },
      (error) => {
        this.setState({ isLoaded: false });
      }
    );
  }

  }
}

export default App;
