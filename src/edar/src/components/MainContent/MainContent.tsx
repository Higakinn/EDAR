import React, { useState } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import RestaurantList from './RestaurantList';
import SelectGenre from './SelectGenre';

// テーマの設定
const theme = createMuiTheme({
    palette: {
        type: "light",
    },
});

const MainContent = () => {
    let [position, setPosition] = useState({ latitude: 0, longitude: 0 });
    let [isLoadedLocationInfo, setIsLoadedLocationInfo] = useState(false);
    let [isLoadedShopInfo, setIsLoadedShopInfo] = useState(false);
    let [isProcessing, setIsProcessing] = useState(false);
    let [shops, setShops] = useState([]);
    let [url, setUrl] = useState("");
    let [errorMessage, setErrorMessage] = useState("");
    let [genre, setgenre] = useState("");
    let [expanded, setExpanded] = useState([]);
    let [genreList, setGenreList] = useState([]);

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

export default MainContent;
