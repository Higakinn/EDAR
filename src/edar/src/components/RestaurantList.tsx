import React, { Component } from 'react';
import axios from 'axios';
import base64 from 'base-64';

class RestaurantList extends Component {
    state = {
        latitude: null,
        longitude: null,
        isLoaded: false,
        isLoadedShopInfo: false,
        isPushed: false,
        shops: [],
        url: "",
    };

    // 初期化
    constructor(props: any) {
        super(props);
        this.getLocationInfo = this.getLocationInfo.bind(this);
    }

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
            .finally(() => {
                this.setState({ isPushed: true });
            }
            );
    }

    // 条件よりURLを設定
    setLocationInfoToURL() {
        let url: string = "https://quiet-hamlet-14379.herokuapp.com/hgs?lat=" + this.state.latitude + "&lng=" + this.state.longitude + "&range=4&order=1";
        this.setState({ url: url });
        this.getShopInfo();
    }


    render() {
        return (
            <div className="shopList">
                <button onClick={this.getLocationInfo}>
                    現在地よりお店を検索
        </button>
                <ol>
                    {this.state.shops.map((index: any) => (
                        <li key={index.id}>{index.name}</li>
                    ))}
                    {this.state.isPushed &&
                        !this.state.isLoaded &&
                        <p> 位置情報が取得できませんでした。</p>}
                    {this.state.isPushed &&
                        !this.state.isLoadedShopInfo &&
                        <p>お店の情報を取得できませんでした。</p>}
                </ol>
            </div >
        )
    }
}

export default RestaurantList;
