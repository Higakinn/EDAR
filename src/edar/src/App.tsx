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
    url: "",
  };

  // 経度緯度情報を取得
  getLocationInfo() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ longitude: position.coords.longitude, latitude: position.coords.latitude, isLoaded: true });
        this.setLocationInfoToURL();
      },
      (error) => {
        this.setState({ isLoaded: false });
      }
    );
  }

  }

  // 条件よりURLを設定
  setLocationInfoToURL() {
    let url: string = "https://quiet-hamlet-14379.herokuapp.com/hgs?lat=" + this.state.latitude + "&lng=" + this.state.longitude + "&range=4&order=1";
    this.setState({ url: url });
  }


}

export default App;
