import React, { useEffect } from 'react';
import { Button, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import type { Shop, Genre } from './MainContent';
import { getGenre, getPosition, getShopList } from './api';


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

export default function SelectGenre(props: Props) {
    const classes = useStyles();

    // 経度緯度情報を取得
    const getLocationInfo = (event: React.FormEvent<HTMLFormElement>) => {
        props.setIsProcessing(true);
        event.preventDefault();
        getPosition()
            .then((position: { latitude: number, longitude: number }) => {
                props.setIsLoadedLocationInfo(true);
                const { latitude, longitude } = position;
                props.setPosition({ latitude, longitude });
            })
            .catch((errorCode: number) => {
                let errorMessage = "";
                switch (errorCode) {
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
            })
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
            getShopList(props.url)
                .then((shops: Shop[]) => {
                    props.setShops(shops);
                    props.setIsLoadedShopInfo(true);
                })
                .catch((err) => {
                    props.setIsLoadedShopInfo(false);
                })
                .finally(() => {
                    props.setIsProcessing(false);
                });
        }
        // TODO;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.url]);

    // ジャンルが変更された際の処理
    const changedgenre = (event: React.ChangeEvent<{ name?: string | undefined, value: any | string }>) => {
        props.setgenre(event.target.value);
    };

    // ジャンル取得
    useEffect(() => {
        getGenre()
            .then((response: Genre[]) => props.setGenreList(response))
            .catch((error) => console.log(error))
        // TODO;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <Grid container spacing={3} alignItems="center" justify="center">
                <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => getLocationInfo(event)}>
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            {/* TODO; */}
                            <InputLabel htmlFor="select" color="secondary" id="label">ジャンル</InputLabel>
                            <Select
                                data-testid="select"
                                id="select"
                                labelId="label"
                                value={props.genre}
                                onChange={(event: React.ChangeEvent<{ name?: string | undefined, value: any | string }>) => changedgenre(event)}
                                required
                            >
                                {props.genreList.map((output: Genre, index: number) => (
                                    <MenuItem key={index} value={output.code}> {output.name} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid>
                        <Button data-testid="seachButton" type="submit" variant="contained" className={classes.sendButton}>
                            現在地よりお店を検索
                        </Button>
                    </Grid>
                </form>
            </Grid>
        </>
    )
}

// CSS-in-JS
const useStyles = makeStyles((theme: Theme) => ({
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
