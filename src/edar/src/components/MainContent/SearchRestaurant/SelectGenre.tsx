import React, { useEffect } from 'react';
import { useEffectCustom } from '../../../customHooks/useEffectCustom';
import { Button, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import type { Genre } from './SearchRestaurant';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../stores/rootReducer';
import { createURL, setGenre } from '../../../stores/shopInformation';
import { fetchPosition, fetchGenreList, fetchShopList } from '../../../stores/shopInformation'
import { NarrowDown } from './NarrowDown';

export const SelectGenre = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        position,
        genre,
        url,
        genreList,
        range
    } = useSelector((state: RootState) => state.shopInformation);

    // 経度緯度情報を取得
    function getLocationInfo(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        dispatch(fetchPosition());
    };

    // 経度、緯度が更新されたらお店取得URLを作成
    useEffectCustom(() => {
        dispatch(createURL());
        // TODO: (警告が出る)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [position]);

    // URLが更新されたらお店の情報を取得
    useEffectCustom(() => {
        dispatch(fetchShopList(url));
        // TODO: (警告が出る)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url]);

    // ジャンルが変更された際の処理
    function changedgenre(event: React.ChangeEvent<{ name?: string | undefined, value: any | string }>) {
        dispatch(setGenre(event.target.value));
    };

    // ジャンル取得
    useEffect(() => {
        dispatch(fetchGenreList());
        // TODO: (警告が出る)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => getLocationInfo(event)} className={classes.selectSection}>
                <Grid container spacing={3} alignItems="center" justify="center">
                    <Grid item xs='auto'>
                        <NarrowDown />
                    </Grid>
                    <Grid item xs='auto'>
                        <FormControl className={classes.formControl} variant="outlined">
                            {/* TODO: (警告が出る) */}
                            <InputLabel htmlFor="select" color="primary" id="label">ジャンル</InputLabel>
                            <Select
                                data-testid="select"
                                id="select"
                                labelId="label"
                                label='ジャンル'
                                value={genre}
                                onChange={(event: React.ChangeEvent<{ name?: string | undefined, value: any | string }>) => changedgenre(event)}
                                required
                            >
                                {genreList.map((output: Genre, index: number) => (
                                    <MenuItem key={index} value={output.code}> {output.name} </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
                <Grid container spacing={3} alignItems="center" justify="center">
                    <Grid item xs='auto' className={classes.option}>
                        <Grid item xs='auto'>
                            <span className={classes.optionLabel}>エリア</span>
                            <span>現在地</span>
                        </Grid>
                        <Grid item xs='auto'>
                            <span className={classes.optionLabel}>範囲</span>
                            <span>{range.label}</span>
                        </Grid>
                    </Grid>
                    <Grid item xs='auto'>
                        <Button
                            data-testid="seachButton"
                            type="submit"
                            variant="contained"
                            className={classes.sendButton}
                            startIcon={<SearchIcon />}
                        >
                            現在地より検索
                        </Button>
                    </Grid>
                </Grid>
            </form>
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
        backgroundColor: '#fff'
    },
    sendButton: {
        margin: "12px 0",
        width: "190px",
        height: 45,
        marginLeft: "auto",
        marginRight: "auto",
    },
    narrowDown: {
        width: '250px',
        margin: '30px',
        padding: '30px',
    },
    selectSection: {
        backgroundColor: '#fff'
    },
    option: {
        color: '#3cb371',
        fontSize: '17px',
        [theme.breakpoints.down('sm')]: {
            color: '#3cb371',
            fontSize: '15px',
        }
    },
    optionLabel: {
        padding: '0px 10px',
        marginRight: '10px',
        border: '1px solid #3cb371',
        borderRadius: '5px',
    },
}));
