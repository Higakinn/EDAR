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
import PropTypes from 'prop-types';
import Account from './Account';
import TakeOut from './TakeOut';
import Delivery from './Delivery';
import Reservation from './Reservation';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        toolBar: {
            minHeight: 36,
        },
        titleBlock: {
            margin: 'auto',
        },
        subTitle: {
            color: "#008000",
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        },
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

const GridMapping = (props: gridProps) => {
    const items = props.items
    const titles = props.titles
    const classes = useStyles();
    return (
        <Grid container>
            <Grid item xs={4} sm={4} className={classes.titleBlock}>
                <Typography variant="h6">
                    {titles.title}
                </Typography >
                <Typography variant="caption" className={classes.subTitle}>
                    {titles.subtitle}
                </Typography>
            </Grid>
            <Grid item xs={2} sm={2}>
                <Reservation message={items[0].message} icon={items[0].icon} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Delivery message={items[1].message} icon={items[1].icon} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <TakeOut message={items[2].message} icon={items[2].icon} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Account message={items[3].message} icon={items[3].icon} />
            </Grid>
        </Grid >
    )
}

const Header = (props: { title: string, subtitle: string }) => {
    const classes = useStyles();
    const item = [
        { message: "飲食店予約", icon: HomeIcon },
        { message: "デリバリ-", icon: LocalMallIcon },
        { message: "テイクアウト", icon: StorefrontIcon },
        { message: "アカウント", icon: AccountBoxIcon },
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

export default Header;

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
