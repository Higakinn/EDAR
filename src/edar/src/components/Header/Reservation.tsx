import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

export default function Reservation(props: { message: string, icon: React.ElementType<any> }) {
    const classes = useStyles();
    const { message, icon } = props;

    return (
        <>
            <IconButton aria-label="login-button">
                {React.createElement(icon, { color: 'primary' })}
                <Typography variant="caption" className={classes.sectionMobile}>{message}</Typography>
            </IconButton>
        </>
    );
}

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
