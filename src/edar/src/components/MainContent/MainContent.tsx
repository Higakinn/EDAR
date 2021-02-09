import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import RestaurantList from './RestaurantList';
import SelectGenre from './SelectGenre';

export type Shop = {
    "access": string
    "address": string
    "band": string
    "barrier_free": string
    "budget": {
        "average": string
        "code": string
        "name": string
    }
    "budget_memo": string
    "capacity": number
    "card": string
    "catch": string
    "charter": string
    "child": string
    "close": string
    "coupon_urls": {
        "pc": string
        "sp": string
    }
    "course": string
    "english": string
    "free_drink": string
    "free_food": string
    "genre": {
        "catch": string
        "code": string
        "name": string
    }
    "horigotatsu": string
    "id": string
    "karaoke": string
    "ktai_coupon": number
    "large_area": {
        "code": string
        "name": string
    }
    "large_service_area": {
        "code": string
        "name": string
    },
    "lat": number
    "lng": number
    "logo_image": string
    "lunch": string
    "middle_area": {
        "code": string
        "name": string
    }
    "midnight": string
    "mobile_access": string
    "name": string
    "name_kana": string
    "non_smoking": string
    "open": string
    "other_memo": string
    "parking": string
    "party_capacity": string | number
    "pet": string
    "photo": {
        "mobile": {
            "l": string
            "s": string
        }
        "pc": {
            "l": string
            "m": string
            "s": string
        }
    }
    "private_room": string
    "service_area": {
        "code": string
        "name": string
    }
    "shop_detail_memo": string
    "show": string
    "small_area": {
        "code": string
        "name": string
    }
    "station_name": string
    "tatami": string
    "tv": string
    "urls": {
        "pc": string
    }
    "wedding": string
    "wifi": string
}

export type Genre = {
    code: string
    name: string
}

// テーマの設定
const theme = createMuiTheme({
    palette: {
        type: "light",
    },
});

export default function MainContent() {
    let [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    let [isLoadedLocationInfo, setIsLoadedLocationInfo] = useState(false);
    let [isLoadedShopInfo, setIsLoadedShopInfo] = useState(false);
    let [isProcessing, setIsProcessing] = useState(false);
    let [shops, setShops] = useState<Shop[]>([]);
    let [url, setUrl] = useState("");
    let [errorMessage, setErrorMessage] = useState("");
    let [genre, setgenre] = useState("");
    let [expanded, setExpanded] = useState<boolean[]>([]);
    let [genreList, setGenreList] = useState<Genre[]>([]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <SelectGenre
                    setIsProcessing={setIsProcessing}
                    setPosition={setPosition}
                    setIsLoadedLocationInfo={setIsLoadedLocationInfo}
                    setErrorMessage={setErrorMessage}
                    setgenre={setgenre}
                    setGenreList={setGenreList}
                    setUrl={setUrl}
                    setShops={setShops}
                    setIsLoadedShopInfo={setIsLoadedShopInfo}
                    genre={genre}
                    position={position}
                    genreList={genreList}
                    isLoadedLocationInfo={isLoadedLocationInfo}
                    url={url}
                />
                <RestaurantList
                    setExpanded={setExpanded}
                    shops={shops}
                    isProcessing={isProcessing}
                    isLoadedLocationInfo={isLoadedLocationInfo}
                    isLoadedShopInfo={isLoadedShopInfo}
                    errorMessage={errorMessage}
                    expanded={expanded}
                />
            </ThemeProvider>
        </>
    )
}
