import React from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        backgroundColor: "gray"
    },
    title: {
        fontSize: 14,
    },
    media: {
        height: 400,
    },
});


export const EdarSiteTop = () => {
    const classes = useStyles();
    //https://picsum.photos/images より食品にかんする画像IDを抽出
    const foodImgIds = [292, 488, 493, 674, 75, 766, 824, 1060, 1080, 225]
    const foodImgId = foodImgIds[Math.floor(Math.random() * foodImgIds.length)]
    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image={`https://picsum.photos/id/${foodImgId}/400/400`}
                        title="food image"
                    />
                </Card>
            </Grid>
        </Grid>
    );
}
