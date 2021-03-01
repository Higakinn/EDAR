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

type GridProps = {
    headerMenus: {
        menuLabel: string,
        menuIcon: React.ElementType<any>
    }[],
    titles: {
        title: string,
        subtitle: string
    }
};

const GridMapping = (props: GridProps) => {
    const { headerMenus, titles } = props;
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
                <Reservation menuLabel={headerMenus[0].menuLabel} menuIcon={headerMenus[0].menuIcon} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Delivery menuLabel={headerMenus[1].menuLabel} menuIcon={headerMenus[1].menuIcon} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <TakeOut menuLabel={headerMenus[2].menuLabel} menuIcon={headerMenus[2].menuIcon} />
            </Grid>
            <Grid item xs={2} sm={2}>
                <Account menuLabel={headerMenus[3].menuLabel} menuIcon={headerMenus[3].menuIcon} />
            </Grid>
        </Grid >
    )
}

const Header = (props: { title: string, subtitle: string }) => {
    const classes = useStyles();
    const headerMenus = [
        { menuLabel: "飲食店予約", menuIcon: HomeIcon },
        { menuLabel: "デリバリ-", menuIcon: LocalMallIcon },
        { menuLabel: "テイクアウト", menuIcon: StorefrontIcon },
        { menuLabel: "アカウント", menuIcon: AccountBoxIcon },
    ];
    const titles = { title: props.title, subtitle: props.subtitle };

    return (
        <AppBar position='static' color='transparent'>
            <Toolbar className={classes.toolBar}>
                <GridMapping titles={titles} headerMenus={headerMenus} />
            </Toolbar>
        </AppBar>
    );
}

export default Header;

Header.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
};
