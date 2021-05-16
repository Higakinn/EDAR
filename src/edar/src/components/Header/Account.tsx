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
import { useDispatch, useSelector } from 'react-redux';
import { loginWithGoogle, logout } from '../../firebase/authentication';
import {
  updateUserInformation,
  clearUserInformation,
} from '../../reducks/user/reducers';
import type { RootState } from '../../reducks/rootReducer';
import { getUser, getIsLoggedIn } from '../../reducks/user/selectors';

type LoginDialogRawProps = {
  classes: Record<'paper', string>;
  id: string;
  keepMounted: boolean;
  isOpeningDialog: boolean;
  closeAccountDialog: () => void;
};

const LoginDialogRaw = (props: LoginDialogRawProps) => {
  const { closeAccountDialog, isOpeningDialog, ...other } = props;
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => state);
  const user = getUser(selector);
  const isLoggedIn = getIsLoggedIn(selector);

  // ログイン処理をして、ユーザー情報をreduxにて管理
  async function setLoggedInUserWithGoogle() {
    try {
      const user = await loginWithGoogle();
      const { email, displayName, photoURL } = user;
      dispatch(updateUserInformation({ email, displayName, photoURL }));
      closeAccountDialog();
      alert('ログインが成功しました。');
    } catch (error) {
      alert('ログインに失敗しました。もう一度やり直してください。');
    }
  }

  // ログアウト処理
  function logOutUser() {
    logout();
    dispatch(clearUserInformation());
    closeAccountDialog();
    alert('ログアウトしました。');
  }

  return (
    <>
      <Dialog
        maxWidth="xs"
        onClose={closeAccountDialog}
        open={isOpeningDialog}
        {...other}
      >
        <DialogTitle id="login-dialog-title">ログイン</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>連携アカウント</DialogContentText>
          <Button variant="outlined" onClick={setLoggedInUserWithGoogle}>
            Googleアカウントでログイン
          </Button>
        </DialogContent>
        {isLoggedIn && (
          <DialogContent dividers>
            <DialogContentText>
              {user.email}でログインしています。
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button autoFocus onClick={closeAccountDialog} color="primary">
            キャンセル
          </Button>
          {isLoggedIn && (
            <Button onClick={logOutUser} color="primary">
              ログアウト
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export const Account = (props: {
  menuLabel: string;
  menuIcon: React.ElementType<any>;
}) => {
  const classes = useStyles();
  const { menuLabel, menuIcon } = props;
  const [isOpeningDialog, setIsOpeningDialog] = useState(false);
  const selector = useSelector((state: RootState) => state);
  const user = getUser(selector);
  const isLoggedIn = getIsLoggedIn(selector);

  function openAccountDialog() {
    setIsOpeningDialog(true);
  }

  function closeAccountDialog() {
    setIsOpeningDialog(false);
  }

  return (
    <>
      <div className={classes.root}>
        <IconButton aria-label="account-button" onClick={openAccountDialog}>
          {isLoggedIn && (
            <Avatar
              alt={user.displayName!}
              src={user.photoURL!}
              color="primary"
              className={classes.loginIcon}
            />
          )}
          {!isLoggedIn && React.createElement(menuIcon, { color: 'primary' })}
          <Typography variant="caption" className={classes.sectionMobile}>
            {menuLabel}
          </Typography>
        </IconButton>
        <LoginDialogRaw
          classes={{
            paper: classes.paper,
          }}
          id="account"
          keepMounted
          isOpeningDialog={isOpeningDialog}
          closeAccountDialog={closeAccountDialog}
        />
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sectionMobile: {
      display: 'flex',
      marginLeft: theme.spacing(1),
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
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
  })
);
