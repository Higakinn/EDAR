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


export default function SiteContents() {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={12} sm={12}>
                <Card className={classes.root}>
                    <CardMedia
                        className={classes.media}
                        image="https://picsum.photos/400/400"
                        title="sample"
                    />
                </Card>
            </Grid>
        </Grid>
    );
}





