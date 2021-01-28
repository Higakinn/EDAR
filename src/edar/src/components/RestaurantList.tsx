import React, { useState, useEffect } from 'react';
import axios from 'axios';
import base64 from 'base-64';
import { Button, InputLabel, Select, FormControl, MenuItem } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';

// テーマの設定
const darkTheme = createMuiTheme({
    palette: {
        type: "light",
    },
});

const RestaurantList = () => {
    let [latitude, setLatitude] = useState(0);
    let [longitude, setLongitude] = useState(0);
    let [isLoadedLocationInfo, setIsLoadedLocationInfo] = useState(false);
    let [isLoadedShopInfo, setIsLoadedShopInfo] = useState(false);
    let [isPushed, setIsPushed] = useState(false);
    let [shops, setShops] = useState([]);
    let [url, setUrl] = useState("");
    let [errorMessage, setErrorMessage] = useState("");
    let [genre, setgenre] = useState("");
    let [expanded, setExpanded] = useState(false);
    const classes = useStyles();

    // 折りたたみボタンを押した際のフラグ変更
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    // 位置情報、ジャンルコードよりお店情報取得のURLを作成
    const setLocationInfoToURL = () => {
        url = process.env['REACT_APP_RSTRNT_API_URL'] + '/hgs?lat=' + latitude + '&lng=' + longitude + '&range=4&order=1&genre=' + genre;
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
        // TODO;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [longitude, latitude, genre]);

    // ジャンルが変更された際の処理
    const changedgenre = (event: any) => {
        genre = event.target.value;
        setgenre(genre);
    };

    return (
        <>
            <ThemeProvider theme={darkTheme}>
                <Grid container spacing={3} alignItems="center" justify="center" direction="column">
                    <Grid item>
                        <FormControl className={classes.formControl}>
                            {/* TODO; */}
                            <InputLabel htmlFor="select" color="secondary" id="label">ジャンル</InputLabel>
                            <Select id="select" labelId="label" value={genre} onChange={(event) => changedgenre(event)}>
                                <MenuItem value={'G007'}>中華</MenuItem>
                                <MenuItem value={'G006'}>イタリアン</MenuItem>
                                <MenuItem value={'G005'}>洋食</MenuItem>
                                <MenuItem value={'G013'}>ラーメン</MenuItem>
                                <MenuItem value={'G016'}>お好み焼き</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" onClick={getLocationInfo}>
                            現在地よりお店を検索
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justify="center">
                    <Grid item>
                        {isPushed &&
                            !isLoadedLocationInfo &&
                            <p> {errorMessage}</p>}
                        {(isPushed && isLoadedLocationInfo) &&
                            !isLoadedShopInfo &&
                            <p>お店の情報を取得できませんでした。</p>}
                    </Grid>
                    {shops.map((output: any, index: number) => (
                        <Grid item key={index}>
                            <Card className={classes.cardRoot}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    avatar={
                                        <Avatar aria-label="index" className={classes.cardAvatar}>
                                            {index + 1}
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon />
                                        </IconButton>
                                    }
                                    title={output.name}
                                    subheader={output.budget.average}
                                />
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={output.photo.pc.m}
                                />
                                <CardContent>
                                    <Typography variant="body2" color="textPrimary" component="p" className={classes.cardMessage}>
                                        {output.catch}
                                        {output.access}
                                    </Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                    <IconButton
                                        className={clsx(classes.cardExpand, {
                                            [classes.cardExpandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit className={classes.cardCollapse}>
                                    <CardContent>
                                        <Typography paragraph>{output.access}</Typography>
                                        <Typography paragraph>{output.address}</Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </ThemeProvider>
        </>
    )
}

// CSS-in-JS
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(5),
        minWidth: 150,
    },
    cardRoot: {
        maxWidth: 345,
        margin: 15,
    },
    cardMedia: {
        height: 200,
        width: 300,
        objectFit: "cover",
        marginLeft: "auto",
        marginRight: "auto",
    },
    cardExpand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest
        })
    },
    cardExpandOpen: {
        transform: "rotate(180deg)"
    },
    cardAvatar: {
        backgroundColor: red[500]
    },
    cardMessage: {
        height: 70,
        width: 300,
    },
    cardHeader: {
        height: 70,
        width: 300,
    },
    cardCollapse: {
        height: "auto",
        width: 300,
    },
}));

export default RestaurantList;
