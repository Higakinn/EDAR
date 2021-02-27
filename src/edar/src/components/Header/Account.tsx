import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Avatar from '@material-ui/core/Avatar';
import { useDispatch, useSelector } from "react-redux";
import { loginWithGoogle, logout } from "../../firebase/authentication";
import { updateUserInfomation, clearUserInfomation } from '../../stores/userInformation';
import { RootState } from '../../stores/rootReducer';

export interface loginDialogRawProps {
    classes: Record<'paper', string>;
    id: string;
    keepMounted: boolean;
    isOpeningDialog: boolean;
    onCloseDialog: () => void;
}

function LoginDialogRaw(props: loginDialogRawProps) {
    const { onCloseDialog, isOpeningDialog, ...other } = props;
    const dispatch = useDispatch();
    const { user, isLogining } = useSelector((state: RootState) => state.userInfomation);

    // ログイン処理をして、ユーザー情報をreduxにて管理
    const processLoginWithGoogle = async () => {
        try {
            const user = await loginWithGoogle();
            const { email, displayName, photoURL } = user;
            dispatch(updateUserInfomation({ email, displayName, photoURL }));
            onCloseDialog();
            alert('ログインが成功しました。');
        } catch (error) {
            alert('ログインに失敗しました。もう一度やり直してください。')
        }
    };

    // ログアウト処理
    const processLogout = () => {
        logout();
        dispatch(clearUserInfomation());
        onCloseDialog();
        alert('ログアウトしました。');
    };

    // ダイアログを閉じた時
    const canceledDialog = () => {
        onCloseDialog();
    };

    return (
        <>
            <Dialog
                maxWidth="xs"
                onClose={onCloseDialog}
                open={isOpeningDialog}
                {...other}
            >
                <DialogTitle id="login-dialog-title">ログイン</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        連携アカウント
                    </DialogContentText>
                    <Button variant="outlined" onClick={processLoginWithGoogle}>Googleアカウントでログイン</Button>
                </DialogContent>
                {(isLogining) && (
                    <DialogContent dividers>
                        <DialogContentText>
                            {user.email}でログインしています。
                    </DialogContentText>
                    </DialogContent>
                )}
                <DialogActions>
                    <Button autoFocus onClick={canceledDialog} color="primary">
                        キャンセル
                    </Button>
                    {(isLogining) && (
                        <Button onClick={processLogout} color="primary">
                            ログアウト
                        </Button>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}

export default function Account(props: { message: string, icon: React.ElementType<any> }) {
    const classes = useStyles();
    const { message, icon } = props;
    const [isOpeningDialog, setIsOpeningDialog] = useState(false);
    const { user, isLogining } = useSelector((state: RootState) => state.userInfomation);

    const clickLoginButton = () => {
        setIsOpeningDialog(true);
    };

    const onCloseDialog = () => {
        setIsOpeningDialog(false);
    };

    return (
        <>
            <div className={classes.root}>
                <IconButton aria-label="account-button" onClick={clickLoginButton}>

                    {(isLogining) &&
                        (<Avatar alt={user.displayName!} src={user.photoURL!} color='primary' className={classes.loginIcon} />)
                    }
                    {(!isLogining) &&
                        React.createElement(icon, { color: 'primary' })
                    }
                    <Typography variant="caption" className={classes.sectionMobile}>{message}</Typography>
                </IconButton>
                <LoginDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    id="account"
                    keepMounted
                    isOpeningDialog={isOpeningDialog}
                    onCloseDialog={onCloseDialog}
                />
            </div>
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
        },
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            width: '80%',
            maxHeight: 435,
        },
        loginIcon: {
            width: theme.spacing(2.8),
            height: theme.spacing(2.8),
        },
    }),
);
