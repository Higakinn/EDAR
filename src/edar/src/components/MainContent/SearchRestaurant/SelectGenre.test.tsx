import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { SelectGenre } from './SelectGenre';
import { useSelector, useDispatch } from 'react-redux';
import type { Genre } from './SearchRestaurant';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

jest.mock('../../../stores/shopInformation');
jest.mock('react-redux');
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

type State = {
    position: {
        latitude: number
        longitude: number
    }
    url: string
    genre: string
    genres: Genre[]
    range: {
        code: string
        label: string
    }
}

describe('SelectGenreコンポーネント', () => {
    const testData: State = {
        position: {
            latitude: 132,
            longitude: 32,
        },
        url: 'https://shopInfo/test/url',
        genre: 'G001',
        genres: [
            {
                code: 'G001',
                name: '中華'
            },
            {
                code: 'G002',
                name: 'イタリアン'
            }
        ],
        range: {
            code: '3',
            label: '～1000m'
        },
    };

    beforeEach(() => {
        useSelectorMock.mockReturnValue(testData);
        useDispatchMock.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    test('検索ボタンが表示されているか', () => {
        render(<SelectGenre />);
        expect(screen.getByText('現在地より検索')).toBeInTheDocument();
    });

    test('ジャンルのプルダウンを押すとジャンル一覧が表示される', () => {
        render(<SelectGenre />);
        userEvent.click(screen.getByTestId('select'));
        expect(screen.getByText('中華')).toBeInTheDocument();
    });

    test('ジャンルを選択し、現在地よりお店を検索ボタンを押せるか', () => {
        render(<SelectGenre />);
        userEvent.click(screen.getByTestId('select'));
        userEvent.click(screen.getByText('中華'));
        userEvent.click(screen.getByTestId('seachButton'));
    });

    test.skip('ジャンル取得APIから情報を取得できているかは目視にて確認', () => { });

    test.skip('現在地、ジャンルよりURLを作成し、お店の情報を取得できているかを目視で確認', () => { });

});
