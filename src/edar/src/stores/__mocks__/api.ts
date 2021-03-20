import type { Genre, Shop } from '../../components/MainContent/SearchRestaurant/SearchRestaurant';

export async function getGenre(): Promise<Genre[]> {
    const genres = [
        {
            "code": "G001",
            "name": "居酒屋"
        },
        {
            "code": "G002",
            "name": "ダイニングバー・バル"
        },
        {
            "code": "G003",
            "name": "創作料理"
        },
        {
            "code": "G004",
            "name": "和食"
        },
        {
            "code": "G005",
            "name": "洋食"
        },
        {
            "code": "G006",
            "name": "イタリアン・フレンチ"
        },
        {
            "code": "G007",
            "name": "中華"
        },
        {
            "code": "G008",
            "name": "焼肉・ホルモン"
        },
        {
            "code": "G017",
            "name": "韓国料理"
        },
        {
            "code": "G009",
            "name": "アジア・エスニック料理"
        },
        {
            "code": "G010",
            "name": "各国料理"
        },
        {
            "code": "G011",
            "name": "カラオケ・パーティ"
        },
        {
            "code": "G012",
            "name": "バー・カクテル"
        },
        {
            "code": "G013",
            "name": "ラーメン"
        },
        {
            "code": "G016",
            "name": "お好み焼き・もんじゃ"
        },
        {
            "code": "G014",
            "name": "カフェ・スイーツ"
        },
        {
            "code": "G015",
            "name": "その他グルメ"
        }
    ];
    return new Promise((resolve, reject) => {
        resolve(genres);
    })
}

export async function getShopList(url: string): Promise<Shop[]> {
    const shops: Shop[] = [
        {
            "access": "新宿駅西口徒歩9分/東京メトロ丸ノ内線西新宿駅徒歩4分/都営地下鉄大江戸線都庁前駅A7出口C4連絡通路(6:00～23:00)直結",
            "address": "東京都新宿区西新宿２‐７‐２　ハイアット リージェンシー 東京 ２F",
            "band": "不可",
            "barrier_free": "なし",
            "budget": {
                "average": "昼1800円　夜2000円",
                "code": "B001",
                "name": "1501～2000円"
            },
            "budget_memo": "10%のサービス料が加算されます。",
            "capacity": 158,
            "card": "利用可",
            "catch": "",
            "charter": "貸切不可",
            "child": "お子様連れOK",
            "close": "無",
            "coupon_urls": {
                "pc": "https://www.hotpepper.jp/strJ000744204/map/?vos=nhppalsa000016",
                "sp": "https://www.hotpepper.jp/strJ000744204/scoupon/?vos=nhppalsa000016"
            },
            "course": "なし",
            "english": "あり",
            "free_drink": "あり",
            "free_food": "あり",
            "genre": {
                "catch": "ダイニングカフェ",
                "code": "G002",
                "name": "ダイニングバー・バル"
            },
            "horigotatsu": "なし",
            "id": "J000744204",
            "karaoke": "なし",
            "ktai_coupon": 1,
            "large_area": {
                "code": "Z011",
                "name": "東京"
            },
            "large_service_area": {
                "code": "SS10",
                "name": "関東"
            },
            "lat": 35.6909099406,
            "lng": 139.6910497326,
            "logo_image": "https://imgfp.hotp.jp/IMGH/92/44/P019889244/P019889244_69.jpg",
            "lunch": "あり",
            "middle_area": {
                "code": "Y055",
                "name": "新宿"
            },
            "midnight": "営業している",
            "mobile_access": "新宿駅西口徒歩9分/丸ﾉ内線西新宿駅徒歩4分",
            "name": "ハイアット リージェンシー 東京 カフェ",
            "name_kana": "かふぇ　はいあっとりーじぇんしーとうきょう",
            "non_smoking": "全面禁煙",
            "open": "月～日、祝日、祝前日: 06:00～翌0:30 （料理L.O. 翌0:00 ドリンクL.O. 翌0:00）",
            "other_memo": "",
            "parking": "あり ：505台 300円/30分（レストラン、バーご利用の場合：3000以上ご利用の場合、3時間まで無料）",
            "party_capacity": "",
            "pet": "不可",
            "photo": {
                "mobile": {
                    "l": "https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_168.jpg",
                    "s": "https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_100.jpg"
                },
                "pc": {
                    "l": "https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_238.jpg",
                    "m": "https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_168.jpg",
                    "s": "https://imgfp.hotp.jp/IMGH/69/51/P019856951/P019856951_58_s.jpg"
                }
            },
            "private_room": "なし",
            "service_area": {
                "code": "SA11",
                "name": "東京"
            },
            "shop_detail_memo": "",
            "show": "なし",
            "small_area": {
                "code": "XA03",
                "name": "都庁"
            },
            "station_name": "新宿",
            "tatami": "なし",
            "tv": "なし",
            "urls": {
                "pc": "https://www.hotpepper.jp/strJ000744204/?vos=nhppalsa000016"
            },
            "wedding": "",
            "wifi": "未確認"
        },
        {
            "access": "JR新宿駅西口より徒歩15分/地下鉄大江戸線都庁前駅A5番出口より徒歩4分/京王新線初台駅より徒歩10分",
            "address": "東京都新宿区西新宿4-31-1　THE KNOT TOKYO Shinjuku 1F",
            "band": "不可",
            "barrier_free": "あり ：【MORETHAN DINING】",
            "budget": {
                "average": "【モーニング、ランチ、カフェ】1000-2000円【ディナー】4000円",
                "code": "B008",
                "name": "4001～5000円"
            },
            "budget_memo": "税別",
            "capacity": 130,
            "card": "利用可",
            "catch": "【ホテルラウンジ】 【ビュッフェ再開！】",
            "charter": "貸切可 ：【MORETHAN DINING】",
            "child": "お子様連れ歓迎 ：【MORETHAN DINING】",
            "close": "※ランチではお席の指定はお断りさせて頂いております。※ご予約時間から15分経過した場合場合はキャンセルとさせて頂きます。",
            "coupon_urls": {
                "pc": "https://www.hotpepper.jp/strJ001201792/map/?vos=nhppalsa000016",
                "sp": "https://www.hotpepper.jp/strJ001201792/scoupon/?vos=nhppalsa000016"
            },
            "course": "あり",
            "english": "あり",
            "free_drink": "あり ：【MORETHAN DINING】",
            "free_food": "なし ：【MORETHAN DINING】",
            "genre": {
                "catch": "新宿 飲み放題  誕生日 女子会 チーズ",
                "code": "G002",
                "name": "ダイニングバー・バル"
            },
            "horigotatsu": "なし ：【MORETHAN DINING】",
            "id": "J001201792",
            "karaoke": "なし",
            "ktai_coupon": 0,
            "large_area": {
                "code": "Z011",
                "name": "東京"
            },
            "large_service_area": {
                "code": "SS10",
                "name": "関東"
            },
            "lat": 35.6885926361,
            "lng": 139.6885958675,
            "logo_image": "https://imgfp.hotp.jp/IMGH/74/75/P030557475/P030557475_69.jpg",
            "lunch": "あり",
            "middle_area": {
                "code": "Y055",
                "name": "新宿"
            },
            "midnight": "営業していない",
            "mobile_access": "JR新宿駅西口より徒歩15分",
            "name": "MORETHAN TAPAS LOUNGE 新宿",
            "name_kana": "もあざんたぱすらうんじしんじゅく",
            "non_smoking": "全面禁煙",
            "open": "月～日、祝日、祝前日: 08:00～22:00 （料理L.O. 21:00 ドリンクL.O. 21:00）",
            "other_memo": "【MORETHAN DINING】",
            "parking": "なし ：【MORETHAN DINING】",
            "party_capacity": 150,
            "pet": "可",
            "photo": {
                "mobile": {
                    "l": "https://imgfp.hotp.jp/IMGH/41/32/P036254132/P036254132_168.jpg",
                    "s": "https://imgfp.hotp.jp/IMGH/41/32/P036254132/P036254132_100.jpg"
                },
                "pc": {
                    "l": "https://imgfp.hotp.jp/IMGH/41/32/P036254132/P036254132_238.jpg",
                    "m": "https://imgfp.hotp.jp/IMGH/41/32/P036254132/P036254132_168.jpg",
                    "s": "https://imgfp.hotp.jp/IMGH/41/32/P036254132/P036254132_58_s.jpg"
                }
            },
            "private_room": "なし ：【MORETHAN DINING】",
            "service_area": {
                "code": "SA11",
                "name": "東京"
            },
            "shop_detail_memo": "【MORETHAN DINING】",
            "show": "なし",
            "small_area": {
                "code": "X160",
                "name": "新宿西口"
            },
            "station_name": "新宿西口",
            "tatami": "なし ：【MORETHAN DINING】",
            "tv": "あり",
            "urls": {
                "pc": "https://www.hotpepper.jp/strJ001201792/?vos=nhppalsa000016"
            },
            "wedding": "承っております。詳細はお問い合わせ下さい。",
            "wifi": "あり"
        }
    ];
    return new Promise((resolve, reject) => {
        resolve(shops);
    });
}

export async function getPosition(): Promise<{ latitude: number, longitude: number }> {
    const position = { latitude: 34.8225536, longitude: 135.4268672 };
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            resolve(position)
        )
    })
}
