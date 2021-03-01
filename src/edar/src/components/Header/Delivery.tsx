import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const Delivery = (props: { menuLabel: string, menuIcon: React.ElementType<any> }) => {
    const classes = useStyles();
    const { menuLabel, menuIcon } = props;

    return (
        <>
            <IconButton aria-label="login-button">
                {React.createElement(menuIcon, { color: 'primary' })}
                <Typography variant="caption" className={classes.sectionMobile}>{menuLabel}</Typography>
            </IconButton>
        </>
    );
}

export default Delivery;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        sectionMobile: {
            display: 'flex',
            marginLeft: theme.spacing(1),
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            }
        }
    }),
);
