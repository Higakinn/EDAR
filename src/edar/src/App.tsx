import Header from './components/Header'
import MainContent from './components/MainContent/MainContent';
import EdarSiteTop from './components/EdarSiteTop'
import Footer from './components/Footer'
import { makeStyles, Theme } from "@material-ui/core/styles";


export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.app}>
      <div className={classes.center}>
        <Header title="EDAR" subtitle="~ Easily decide on a restaurant ~" />
      </div>
      <EdarSiteTop />
      <div className={classes.center}>
        <MainContent />
      </div>
      <Footer title="EDAR" description="~ Easily decide on a restaurant ~" />
    </div>
  );
}

// CSS-in-JS
const useStyles = makeStyles((theme: Theme) => ({
  app: {
    width: '100%',
    textAlign: 'center',
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
