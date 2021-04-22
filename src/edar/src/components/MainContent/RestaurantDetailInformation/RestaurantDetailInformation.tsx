import React, { useState } from 'react';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../reducks/rootReducer';
import type { Shop } from '../SpecifySearchCondition/types';

type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  selectedIndex: number;
};

function createIdLabel(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const TabPanel = (props: TabPanelProps) => {
  const { children, selectedIndex, index, dir } = props;

  return (
    <div
      role="tabpanel"
      hidden={selectedIndex !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      dir={dir}
    >
      {selectedIndex === index && (
        <Box p={3}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const TabsComponent = (props: { shop: Shop }) => {
  const { shop } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const changeSelectedIndex = (
    event: React.ChangeEvent<{}>,
    newSelectedIndex: number
  ) => {
    setSelectedIndex(newSelectedIndex);
  };

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={selectedIndex}
            onChange={changeSelectedIndex}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs"
          >
            <Tab label="トップ" {...createIdLabel(0)} />
            <Tab label="メニュー" {...createIdLabel(1)} />
            <Tab label="ギャラリー" {...createIdLabel(2)} />
            <Tab label="マップ" {...createIdLabel(3)} />
          </Tabs>
        </AppBar>
        <TabPanel selectedIndex={selectedIndex} index={0} dir={theme.direction}>
          <div className={classes.item}>営業時間</div>
          <div className={classes.subItem}>{shop.open}</div>
          <div className={classes.item}>定休日</div>
          <div className={classes.subItem}>{shop.close}</div>
          <div className={classes.item}>総席数</div>
          <div className={classes.subItem}>{shop.capacity}</div>
        </TabPanel>
        <TabPanel selectedIndex={selectedIndex} index={1} dir={theme.direction}>
          <div className={classes.item}>コース</div>
          <div className={classes.subItem}>{shop.course}</div>
          <div className={classes.item}>飲み放題</div>
          <div className={classes.subItem}>{shop.free_drink}</div>
          <div className={classes.item}>食べ放題</div>
          <div className={classes.subItem}>{shop.free_food}</div>
        </TabPanel>
        <TabPanel selectedIndex={selectedIndex} index={2} dir={theme.direction}>
          <img
            src={shop.photo.pc.l}
            alt="写真が表示できませんでした。再リロードしてください。"
          />
        </TabPanel>
        <TabPanel selectedIndex={selectedIndex} index={3} dir={theme.direction}>
          <div className={classes.item}>住所</div>
          <div className={classes.subItem}>{shop.address}</div>
        </TabPanel>
      </div>
    </>
  );
};

export const RestaurantDetailInformation = () => {
  const classes = useStyles();
  const { shops, selectedShopIndex } = useSelector(
    (state: RootState) => state.shopInformation
  );

  return (
    <>
      <Box p={3}>
        <Typography className={classes.genreName} component="div">
          {shops[selectedShopIndex].middle_area.name}
        </Typography>
        <Typography className={classes.genreName} component="div">
          {shops[selectedShopIndex].genre.name}
        </Typography>
        <Typography className={classes.shopName} component="div">
          {shops[selectedShopIndex].name}
        </Typography>
      </Box>
      <TabsComponent shop={shops[selectedShopIndex]} />
    </>
  );
};

// CSS-in-JS
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
  item: {
    fontWeight: 'bold',
    fontSize: '15px',
    margin: '10px 0px',
  },
  subItem: {
    fontWeight: 'normal',
    margin: '0px 0px 10px',
  },
  shopName: {
    fontWeight: 'bold',
    fontSize: '30px',
  },
  genreName: {
    fontWeight: 'bold',
    fontSize: '14px',
  },
}));
