
import MainContent from './components/MainContent/SearchRestaurant/SearchRestaurant';
import Header from './components/Header/Header'
import EdarSiteTop from './components/EdarSiteTop'
import Footer from './components/Footer'
import { makeStyles, Theme } from "@material-ui/core/styles";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { BrowserRouter, Route } from 'react-router-dom';
import RestaurantDetailInformation from './components/MainContent/RestaurantDetailInformation/RestaurantDetailInformation';

export default function App() {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={classes.app}>
          <BrowserRouter>
            <div className={classes.center}>
              <Header title="EDAR" subtitle="~ Easily decide on a restaurant ~" />
            </div>
            <EdarSiteTop />
            <div className={classes.center}>
              <Route exact path='/' component={MainContent} />
              <Route exact path='/detail/:index' component={RestaurantDetailInformation} />
            </div>
            <Footer title="EDAR" description="~ Easily decide on a restaurant ~" />
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

// テーマの設定
const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

// CSS-in-JS
const useStyles = makeStyles((theme: Theme) => ({
  app: {
    width: '100%',
    textAlign: 'center',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: '124.13px',/*←footerの高さ*/
    boxSizing: 'border-box',/*←全て含めてmin-height:100vhに*/
  },
  center: {
    width: '960px',
    margin: '0 auto',
    textAlign: 'left',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      margin: '0 auto',
      textAlign: 'left',
    }
  }
}));
