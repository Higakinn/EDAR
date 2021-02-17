import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuIcon from '@material-ui/icons/Menu';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../stores/rootReducer';
import { updateRange } from '../../stores/shopInfomation';

const distance = [
    { code: '1', label: '～300m' },
    { code: '2', label: '～500m' },
    { code: '3', label: '～1000m' },
    { code: '4', label: '～2000m' },
    { code: '5', label: '～3000m' },
];

export interface NarrowDownDialogRawProps {
    classes: Record<'paper', string>;
    id: string;
    keepMounted: boolean;
    isOpenDialog: boolean;
    onClose: () => void;
}

function NarrowDownDialogRaw(props: NarrowDownDialogRawProps) {
    const { onClose, isOpenDialog, ...other } = props;
    const radioGroupRef = useRef<HTMLElement>(null);
    const dispatch = useDispatch();
    const { range } = useSelector((state: RootState) => state.shopInfomation);
    const [code, setCode] = useState(range.code);

    // キャンセルを押した際に前回値を再設定
    useEffect(() => {
        if (!isOpenDialog) {
            setCode(range.code);
        }
    }, [isOpenDialog, range]);

    const handleEntering = () => {
        if (radioGroupRef.current != null) {
            radioGroupRef.current.focus();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    const handleOk = () => {
        onClose();
        let label = distance[Number(code) - 1].label;
        dispatch(updateRange({ code, label }));
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCode((event.target as HTMLInputElement).value);
    };

    return (
        <>
            <Dialog
                maxWidth="xs"
                onEntering={handleEntering}
                onClose={onClose}
                open={isOpenDialog}
                {...other}
            >
                <DialogTitle id="narrow-down-dialog-title">絞り込み</DialogTitle>
                <DialogContent dividers>
                    <DialogContentText>
                        距離
                    </DialogContentText>
                    <RadioGroup
                        ref={radioGroupRef}
                        name="narrowDown"
                        value={code}
                        onChange={handleChange}
                    >
                        {distance.map((distance) => (
                            <FormControlLabel value={distance.code} key={distance.code} control={<Radio color="primary" />} label={distance.label} />
                        ))}
                    </RadioGroup>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCancel} color="primary">
                        キャンセル
                    </Button>
                    <Button onClick={handleOk} color="primary">
                        設定する
                    </Button>
                </DialogActions>
            </Dialog>

        </>
    );
}

export default function NarrowDown() {
    const classes = useStyles();
    const [isOpenDialog, setIsOpenDialog] = useState(false);

    const handleClickNarrowDown = () => {
        setIsOpenDialog(true);
    };

    const handleClose = () => {
        setIsOpenDialog(false);
    };

    return (
        <>
            <div className={classes.root}>
                <Button
                    variant="outlined"
                    color="primary"
                    size='large'
                    onClick={handleClickNarrowDown}
                    startIcon={<MenuIcon />}
                    className={classes.narrowDownButton}
                    data-testid="narrowDown"
                >
                    絞り込み
                </Button>
                <NarrowDownDialogRaw
                    classes={{
                        paper: classes.paper,
                    }}
                    id="narrowDown"
                    keepMounted
                    isOpenDialog={isOpenDialog}
                    onClose={handleClose}
                />
            </div>
        </>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        paper: {
            width: '80%',
            maxHeight: 435,
        },
        narrowDownButton: {
            height: 53,
        }
    }),
);
