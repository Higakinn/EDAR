export type Shop = {
  access: string;
  address: string;
  band: string;
  barrier_free: string;
  budget: {
    average: string;
    code: string;
    name: string;
  };
  budget_memo: string;
  capacity: number;
  card: string;
  catch: string;
  charter: string;
  child: string;
  close: string;
  coupon_urls: {
    pc: string;
    sp: string;
  };
  course: string;
  english: string;
  free_drink: string;
  free_food: string;
  genre: {
    catch: string;
    code: string;
    name: string;
  };
  horigotatsu: string;
  id: string;
  karaoke: string;
  ktai_coupon: number;
  large_area: {
    code: string;
    name: string;
  };
  large_service_area: {
    code: string;
    name: string;
  };
  lat: number;
  lng: number;
  logo_image: string;
  lunch: string;
  middle_area: {
    code: string;
    name: string;
  };
  midnight: string;
  mobile_access: string;
  name: string;
  name_kana: string;
  non_smoking: string;
  open: string;
  other_memo: string;
  parking: string;
  party_capacity: string | number;
  pet: string;
  photo: {
    mobile: {
      l: string;
      s: string;
    };
    pc: {
      l: string;
      m: string;
      s: string;
    };
  };
  private_room: string;
  service_area: {
    code: string;
    name: string;
  };
  shop_detail_memo: string;
  show: string;
  small_area: {
    code: string;
    name: string;
  };
  station_name: string;
  tatami: string;
  tv: string;
  urls: {
    pc: string;
  };
  wedding: string;
  wifi: string;
};

export type Genre = {
  code: string;
  name: string;
};

export type InitialState = {
  position: {
    latitude: number;
    longitude: number;
  };
  isLoadedLocationInfo: boolean;
  isLoadedShopInfo: boolean;
  isProcessing: boolean;
  shops: Shop[];
  url: string;
  positionErrorMessage: string;
  shopErrorMessage: string;
  genre: string;
  genres: Genre[];
  expandedArray: boolean[];
  range: {
    code: string;
    label: string;
  };
  selectedShopIndex: number;
};

export type TabPanelProps = {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  selectedIndex: number;
};

export type NarrowDownDialogRawProps = {
  classes: Record<'paper', string>;
  id: string;
  keepMounted: boolean;
  isOpeningDialog: boolean;
  onCloseDialog: () => void;
};
