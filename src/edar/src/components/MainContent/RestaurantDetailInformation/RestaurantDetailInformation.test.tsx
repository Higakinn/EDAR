import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { RestaurantDetailInformation } from './RestaurantDetailInformation';
import { useSelector, useDispatch } from 'react-redux';
import userEvent from '@testing-library/user-event';
import type { Shop } from '../SearchRestaurant/SearchRestaurant';

afterEach(cleanup);

jest.mock('../../../stores/shopInformation');
jest.mock('react-redux');
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

type State = {
  selectedShopIndex: number;
  shops: Shop[];
};

describe('RestaurantDetailInformationコンポーネント', () => {
  // 模擬入力データ
  const testData: State = {
    selectedShopIndex: 0,
    shops: [
      {
        access:
          '新宿駅西口徒歩9分/東京メトロ丸ノ内線西新宿駅徒歩4分/都営地下鉄大江戸線都庁前駅A7出口C4連絡通路(6:00～23:00)直結',
        address:
          '東京都新宿区西新宿２‐７‐２　ハイアット リージェンシー 東京 ２F',
        band: '不可',
        barrier_free: 'なし',
        budget: {
          average: '昼1800円　夜2000円',
          code: 'B001',
          name: '1501～2000円',
        },
        budget_memo: '10%のサービス料が加算されます。',
        capacity: 158,
        card: '利用可',
        catch: '',
        charter: '貸切不可',
        child: 'お子様連れOK',
        close: '無',
        coupon_urls: {
          pc: 'https://www.hotpepper.jp/strJ000744204/map/?vos=nhppalsa000016',
          sp:
            'https://www.hotpepper.jp/strJ000744204/scoupon/?vos=nhppalsa000016',
        },
        course: 'なし',
        english: 'あり',
        free_drink: 'あり',
        free_food: 'あり',
        genre: {
          catch: 'ダイニングカフェ',
          code: 'G002',
          name: 'ダイニングバー・バル',
        },
        horigotatsu: 'なし',
        id: 'J000744204',
        karaoke: 'なし',
        ktai_coupon: 1,
        large_area: {
          code: 'Z011',
          name: '東京',
        },
        large_service_area: {
          code: 'SS10',
          name: '関東',
        },
        lat: 35.6909099406,
        lng: 139.6910497326,
        logo_image:
          'https://imgfp.hotp.jp/IMGH/92/44/P019889244/P019889244_69.jpg',
        lunch: 'あり',
        middle_area: {
          code: 'Y055',
          name: '新宿',
        },
        midnight: '営業している',
        mobile_access: '新宿駅西口徒歩9分/丸ﾉ内線西新宿駅徒歩4分',
        name: 'ハイアット リージェンシー 東京 カフェ',
        name_kana: 'かふぇ　はいあっとりーじぇんしーとうきょう',
        non_smoking: '全面禁煙',
        open:
          '月～日、祝日、祝前日: 06:00～翌0:30 （料理L.O. 翌0:00 ドリンクL.O. 翌0:00）',
        other_memo: '',
        parking:
          'あり ：505台 300円/30分（レストラン、バーご利用の場合：3000以上ご利用の場合、3時間まで無料）',
        party_capacity: '',
        pet: '不可',
        photo: {
          mobile: {
            l: 'https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_168.jpg',
            s: 'https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_100.jpg',
          },
          pc: {
            l: 'https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_238.jpg',
            m: 'https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_168.jpg',
            s:
              'https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_58_s.jpg',
          },
        },
        private_room: 'なし',
        service_area: {
          code: 'SA11',
          name: '東京',
        },
        shop_detail_memo: '',
        show: 'なし',
        small_area: {
          code: 'XA03',
          name: '都庁',
        },
        station_name: '新宿',
        tatami: 'なし',
        tv: 'なし',
        urls: {
          pc: 'https://www.hotpepper.jp/strJ000744204/?vos=nhppalsa000016',
        },
        wedding: '',
        wifi: '未確認',
      },
    ],
  };

  beforeEach(() => {
    useSelectorMock.mockReturnValue(testData);
    useDispatchMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('お店の名前が表示されているか', () => {
    render(<RestaurantDetailInformation />);
    expect(screen.getByText(testData.shops[0].name)).toBeInTheDocument();
  });

  test('タブが表示されているか', () => {
    render(<RestaurantDetailInformation />);
    expect(screen.getByText('トップ')).toBeInTheDocument();
    expect(screen.getByText('メニュー')).toBeInTheDocument();
    expect(screen.getByText('ギャラリー')).toBeInTheDocument();
    expect(screen.getByText('マップ')).toBeInTheDocument();
  });

  test('メニュータブを押下したらコース情報が表示されるか', () => {
    render(<RestaurantDetailInformation />);
    userEvent.click(screen.getByText('メニュー'));
    expect(screen.getByText('コース')).toBeInTheDocument();
    expect(screen.getByText(testData.shops[0].course)).toBeInTheDocument();
  });
});
