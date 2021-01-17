import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import base64 from 'base-64';

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
    isLoadedShopInfo: false,
    shops: [],
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

  // 飲食店の情報を取得
  getShopInfo() {
    axios.get(this.state.url, {
      headers: {
        'Authorization': 'Basic ' + base64.encode(process.env['REACT_APP_USER'] + ":" + process.env['REACT_APP_PASSWORD']),
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        this.setState({ shops: res.data.results.shop, isLoadedShopInfo: true });
      })
      .catch((err) => {
        this.setState({ isLoadedShopInfo: false });
      })
      );
  }

  // 条件よりURLを設定
  setLocationInfoToURL() {
    let url: string = "https://quiet-hamlet-14379.herokuapp.com/hgs?lat=" + this.state.latitude + "&lng=" + this.state.longitude + "&range=4&order=1";
    this.setState({ url: url });
    this.getShopInfo();
  }


}

export default App;
