import React , {useState}from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: 12,
      backgroundColor: "gray"
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      margin: 12,
    },
    media: {
        height: 400,
      },
  });


export default function SiteContents () {
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardContent>
                    <CardMedia
                        className={classes.media}
                        image="https://picsum.photos/500/600"
                        title="Paella dish"
                    />   
                    {/* https://picsum.photos/200/300 */}
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={6}>
                <Card className={classes.root}>
                    <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                            EDAR
                        </Typography>
                        <Typography variant="body1" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        // <div>
        // </div>
    );
}





