import React , {useState}from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const DisabledTabs = () => {
    const [value, setValue] = useState(2);
  
    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
      setValue(newValue);
    };
  
    return (
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Active" />
          <Tab label="Disabled" />
          <Tab label="Active" />
        </Tabs>
      </Paper>
    );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
    },
    menuButton: {
      marginRight: theme.spacing(1),
    },
    title: {
      flexGrow: 1,
    },
    subTittle: {
        flexGrow: 1,
        color: "#FFCC00"
    },
    tabs: {
        flexGrow: 2
    }
  }),
);

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position='static' color='inherit'>
        <Toolbar>
          <Typography variant="h6" className={classes.title} display="inline">
              EDAR
          </Typography >
          <Typography className={classes.subTittle}>
            Easily decide on a restaurant
          </Typography>
          {/* <DisabledTabs className={classes.tabs}/> */}
          <Button color="inherit" className={classes.tabs}>Login</Button>
        </Toolbar>
      </AppBar>
      
    </div>
  );
}
