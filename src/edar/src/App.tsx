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

  render() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude, isLoaded: true });
      },
      error => { this.setState({ isLoaded: false }); }
    );

    return this.state.isLoaded ?
      <div>経度は{this.state.longitude}であり、緯度は{this.state.latitude}である。</div>
      :
      <div>位置情報取得に失敗しました。</div>
  }
}

export default App;
