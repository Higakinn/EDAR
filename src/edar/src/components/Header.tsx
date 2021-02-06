import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolBar: {
            minHeight: 36
        },
        subTitle: {
            color: "#FFCC00",
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        }
    }),
);

type gridProps = {
    items: {
        message: string,
        icon: React.ElementType<any>
    }[],
    titles: {
        title: string,
        subtitle: string
    }
};

function GridMapping(props: gridProps) {
    const items = props.items
    const titles = props.titles
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={4} sm={4} >
                <Typography variant="h6">
                    {titles.title}
                </Typography >
                <Typography variant="caption" className={classes.subTitle}>
                    {titles.subtitle}
                </Typography>
            </Grid>
            {
                items.map((data: { message: string, icon: React.ElementType<any> }) => {
                    return <Grid item xs={2} sm={2} key={data.message}>
                        <IconButton aria-label="delete">
                            {React.createElement(data.icon, { color: 'primary' })}
                            <Typography variant="caption" className={classes.sectionMobile}>{data.message}</Typography>
                        </IconButton>
                    </Grid>
                })
            }
        </Grid >
    )
}

export default function Header(props: { title: string, subtitle: string }) {
    const classes = useStyles();
    const item = [
        { message: "飲食店予約", icon: HomeIcon },
        { message: "デリバリ-", icon: LocalMallIcon },
        { message: "テイクアウト", icon: StorefrontIcon },
        { message: "ログイン", icon: AccountBoxIcon },
    ]
    const titles = { title: props.title, subtitle: props.subtitle }

    return (
        <AppBar position='static' color='transparent'>
            <Toolbar className={classes.toolBar}>
                <GridMapping titles={titles} items={item} />
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};