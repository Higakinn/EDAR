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
        errorMessage: "",
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
                let errMsg;
                switch (error.code) {
                    case 1:
                        errMsg = "位置情報の利用が許可されていません";
                        break;
                    case 2:
                        errMsg = "デバイスの位置が判定できません";
                        break;
                    case 3:
                        errMsg = "タイムアウトしました";
                        break;
                }
                this.setState({ isPushed: true, isLoaded: false, errorMessage: errMsg });
            }
        );
    }

    // 飲食店の情報を取得
    getShopInfo() {
        axios.get(this.state.url, {
            headers: {
                'Authorization': 'Basic ' + base64.encode(process.env['REACT_APP_RSTRNT_API_USER'] + ":" + process.env['REACT_APP_RSTRNT_API_PASSWORD']),
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
        let url: string = process.env['REACT_APP_RSTRNT_API_URL'] + '/hgs?lat=' + this.state.latitude + '&lng=' + this.state.longitude + '&range=4&order=1';
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
                        <p> {this.state.errorMessage}</p>}
                    {(this.state.isPushed && this.state.isLoaded) &&
                        !this.state.isLoadedShopInfo &&
                        <p>お店の情報を取得できませんでした。</p>}
                </ol>
            </div >
        )
    }
}

export default RestaurantList;
