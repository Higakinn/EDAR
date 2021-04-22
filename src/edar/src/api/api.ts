import axios from 'axios';
import base64 from 'base-64';
import type { Genre, Shop } from '../reducks/shop/types';

export function getGenre(): Promise<Genre[]> {
  let genreUrl = process.env['REACT_APP_RSTRNT_API_URL'] + '/genre_master';
  return new Promise((resolve, reject) => {
    axios
      .get(genreUrl, {
        headers: {
          Authorization:
            'Basic ' +
            base64.encode(
              process.env['REACT_APP_RSTRNT_API_USER'] +
                ':' +
                process.env['REACT_APP_RSTRNT_API_PASSWORD']
            ),
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        resolve(res.data.results.genre);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
export function getShopList(url: string): Promise<Shop[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        headers: {
          Authorization:
            'Basic ' +
            base64.encode(
              process.env['REACT_APP_RSTRNT_API_USER'] +
                ':' +
                process.env['REACT_APP_RSTRNT_API_PASSWORD']
            ),
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        resolve(response.data.results.shop);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function getPosition(): Promise<{
  latitude: number;
  longitude: number;
}> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position.coords);
      },
      (error) => {
        reject(error.code);
      }
    );
  });
}
