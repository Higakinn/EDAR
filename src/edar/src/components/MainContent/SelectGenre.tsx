import React, { useEffect } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import { Button, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import type { Shop, Genre } from './MainContent';
import { getGenreList } from '../../Api';


type Props = {
    setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>
    setPosition: React.Dispatch<React.SetStateAction<{
        latitude: number;
        longitude: number;
    }>>
    setIsLoadedLocationInfo: React.Dispatch<React.SetStateAction<boolean>>
    setErrorMessage: React.Dispatch<React.SetStateAction<string>>
    setgenre: React.Dispatch<React.SetStateAction<string>>
    setGenreList: React.Dispatch<React.SetStateAction<Genre[]>>
    setUrl: React.Dispatch<React.SetStateAction<string>>
    setShops: React.Dispatch<React.SetStateAction<Shop[]>>
    setIsLoadedShopInfo: React.Dispatch<React.SetStateAction<boolean>>
    genre: string
    position: {
        latitude: number;
        longitude: number;
    }
    genreList: Genre[]
    isLoadedLocationInfo: boolean
    url: string
}

const SelectGenre = (props: Props) => {
    const classes = useStyles();

    // 経度緯度情報を取得
    const getLocationInfo = (event: React.FormEvent<HTMLFormElement>) => {
        props.setIsProcessing(true);
        event.preventDefault();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                props.setIsLoadedLocationInfo(true);
                const { latitude, longitude } = position.coords;
                props.setPosition({ latitude, longitude });
            },
            (error) => {
                let errorMessage = "";
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
                props.setIsProcessing(false);
                props.setIsLoadedLocationInfo(false);
                props.setErrorMessage(errorMessage);
            }
        );
    };

    // 経度、緯度が更新されたらsetLocationInfoToURL関数を呼び出す。
    useEffect(() => {
        if (props.isLoadedLocationInfo) {
            props.setIsProcessing(true);
            setLocationInfoToURL();
        }
        // TODO;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.position, props.genre]);

    // 位置情報、ジャンルコードよりお店情報取得のURLを作成
    const setLocationInfoToURL = () => {
        const url = process.env['REACT_APP_RSTRNT_API_URL'] + '/hgs?lat=' + props.position.latitude + '&lng=' + props.position.longitude + '&range=4&order=1&genre=' + props.genre;
        if (props.url === url) {
            props.setIsProcessing(false)
        } else {
            props.setUrl(url);
        }
    };

    // 経度、緯度が更新されたらsetLocationInfoToURL関数を呼び出す。
    useEffect(() => {
        if (props.isLoadedLocationInfo) {
            axios.get(props.url, {
                headers: {
                    'Authorization': 'Basic ' + base64.encode(process.env['REACT_APP_RSTRNT_API_USER'] + ":" + process.env['REACT_APP_RSTRNT_API_PASSWORD']),
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    props.setShops(res.data.results.shop);
                    props.setIsLoadedShopInfo(true);
                })
                .catch((err) => {
                    props.setIsLoadedShopInfo(false);
                })
                .finally(() => {
                    props.setIsProcessing(false);
                }
                );
        }
        // TODO;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.url]);

    // ジャンルが変更された際の処理
    const changedgenre = (event: any) => {
        props.setgenre(event.target.value);
    };

    // ジャンル取得
    useEffect(() => {
        let genreUrl = process.env['REACT_APP_RSTRNT_API_URL'] + '/genre_master';
        axios.get(genreUrl, {
            headers: {
                'Authorization': 'Basic ' + base64.encode(process.env['REACT_APP_RSTRNT_API_USER'] + ":" + process.env['REACT_APP_RSTRNT_API_PASSWORD']),
                'Content-Type': 'application/json'
            }
        })
            .then((res) => {
                props.setGenreList(res.data.results.genre);
            })
            .catch((err) => {
                console.log(err);
            })
        // TODO;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container spacing={3} alignItems="center" justify="center">
                <form onSubmit={(event) => getLocationInfo(event)}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            {/* TODO; */}
                            <InputLabel htmlFor="select" color="secondary" id="label">ジャンル</InputLabel>
                            <Select id="select" labelId="label" value={props.genre} onChange={(event) => changedgenre(event)} required>
                                {props.genreList.map((output: Genre, index: number) => (
                                    <MenuItem key={index} value={output.code}> {output.name} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button type="submit" variant="contained" className={classes.sendButton}>
                            現在地よりお店を検索
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}

// CSS-in-JS
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(5),
        minWidth: 200,
        marginLeft: "auto",
        marginRight: "auto",
    },
    sendButton: {
        margin: "12px 0",
        width: "100%",
        marginLeft: "auto",
        marginRight: "auto",
    },
}));
export default SelectGenre;
