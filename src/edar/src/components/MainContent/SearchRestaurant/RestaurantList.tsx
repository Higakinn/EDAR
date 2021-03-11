import React from 'react';
import useEffectCustom from '../../../customHooks/useEffectCustom';
import { makeStyles, Theme } from "@material-ui/core/styles";
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
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import CircularProgress from '@material-ui/core/CircularProgress';
import type { Shop } from './SearchRestaurant';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../stores/rootReducer';
import { initExpandedList, updateExpanded, updateSelectedShopIndex } from '../../../stores/shopInformation';
import { Link } from 'react-router-dom';

export const RestaurantList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {
        shops,
        isProcessing,
        isLoadedLocationInfo,
        isLoadedShopInfo,
        positionErrorMessage,
        shopErrorMessage,
        expanded
    } = useSelector((state: RootState) => state.shopInformation);

    // カードの折りたたみを初期化
    useEffectCustom(() => {
        dispatch(initExpandedList());
        // TODO: (警告が出る)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shops]);

    // 折りたたみボタンを押した際のフラグ変更
    function handleExpandClick(index: number) {
        dispatch(updateExpanded(index));
    };

    return (
        <>
            <Grid container justify="center">
                {(!isProcessing && isLoadedLocationInfo && isLoadedShopInfo) &&
                    <h3 className={classes.heading}>検索結果</h3>}
            </Grid>
            <Grid container justify="center">
                <Grid item xs={12} className={classes.messages}>
                    {(!isProcessing && !isLoadedLocationInfo) &&
                        <p className={classes.sideInfo}> {positionErrorMessage}</p>}
                    {(!isProcessing && isLoadedLocationInfo && !isLoadedShopInfo) &&
                        <p className={classes.sideInfo}>{shopErrorMessage}</p>}
                    {(!isProcessing && isLoadedLocationInfo && isLoadedShopInfo && (shops.length === 0)) &&
                        <p className={classes.sideInfo}> 近くに該当ジャンルのお店がありませんでした。</p>}
                    {isProcessing &&
                        <CircularProgress className={classes.sideInfo} disableShrink />}
                </Grid>
            </Grid>
            <Grid container justify="space-evenly">
                {shops.map((output: Shop, index: number) => {
                    return (
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
                                    title={
                                        <Link
                                            to={{ pathname: `/detail/${index}` }}
                                            onClick={() => dispatch(updateSelectedShopIndex(index))}
                                        >
                                            {output.name}
                                        </Link>
                                    }
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
                                            [classes.cardExpandOpen]: expanded[index],
                                        })}
                                        onClick={() => handleExpandClick(index)}
                                        aria-expanded={expanded[index]}
                                        aria-label="show more"
                                    >
                                        <ExpandMoreIcon />
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded[index]} timeout="auto" unmountOnExit className={classes.cardCollapse}>
                                    <CardContent>
                                        <Typography paragraph>{output.access}</Typography>
                                        <Typography paragraph>{output.address}</Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    )
}

// CSS-in-JS
const useStyles = makeStyles((theme: Theme) => ({
    heading: {
        borderBottom: '2px solid #1B73BA',
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '30 0 20',
        paddingBottom: 5,
        paddingTop: 50,
    },
    sideInfo: {
        margin: theme.spacing(5),
        fontSize: 18,
    },
    messages: {
        textAlign: "center"
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
