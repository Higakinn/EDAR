import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base64 from 'base-64';

const RestaurantList = () => {
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [isLoadedLocationInfo, setIsLoadedLocationInfo] = useState(false);
    let [isLoadedShopInfo, setIsLoadedShopInfo] = useState(false);
    let [isPushed, setIsPushed] = useState(false);
    let [shops, setShops] = useState([]);
    let [url, setUrl] = useState("");
    let [errorMessage, setErrorMessage] = useState("");

    // 経度緯度情報を取得
    const getLocationInfo = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setIsLoadedLocationInfo(true);
                setLongitude(position.coords.longitude);
                setLatitude(position.coords.latitude);
            },
            (error) => {
                switch (error.code) {
                    case 1:
                        errorMessage = "位置情報の利用が許可されていません";
                        break;
                    case 2:
                        errorMessage = "デバイスの位置が判定できません";
                        break;
                    case 3:
                        errorMessage = "タイムアウトしました";
                        break;
                }
                setIsPushed(true);
                setIsLoadedLocationInfo(false);
                setErrorMessage(errorMessage);
            }
        );
    };

    const setLocationInfoToURL = () => {
        url = process.env['REACT_APP_RSTRNT_API_URL'] + '/hgs?lat=' + latitude + '&lng=' + longitude + '&range=4&order=1&genre=G006';
        setUrl(url);
        getShopInfo();
    };

    // 飲食店の情報を取得
    const getShopInfo = () => {
        axios.get(url, {
            headers: {
                'Authorization': 'Basic ' + base64.encode(process.env['REACT_APP_RSTRNT_API_USER'] + ":" + process.env['REACT_APP_RSTRNT_API_PASSWORD']),
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                setShops(res.data.results.shop);
                setIsLoadedShopInfo(true);
            })
            .catch((err) => {
                setIsLoadedShopInfo(false);
            })
            .finally(() => {
                setIsPushed(true);
            }
            );
    };

    // 経度、緯度が更新されたらsetLocationInfoToURL関数を呼び出す。
    useEffect(() => {
        if (isLoadedLocationInfo) {
            setLocationInfoToURL();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [longitude, latitude]);

    return (
        <div className="shopList">
            <button onClick={getLocationInfo}>
                現在地よりお店を検索
            </button>
            <ol>
                {shops.map((index: any) => (
                    <li key={index.id}>{index.name}</li>
                ))}
                {isPushed &&
                    !isLoadedLocationInfo &&
                    <p> {errorMessage}</p>}
                {(isPushed && isLoadedLocationInfo) &&
                    !isLoadedShopInfo &&
                    <p>お店の情報を取得できませんでした。</p>}
            </ol>
        </div>
    )
}

export default RestaurantList;
