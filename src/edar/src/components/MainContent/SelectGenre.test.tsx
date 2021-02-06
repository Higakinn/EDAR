jest.mock('./api');

import React, { useState } from 'react';
import { render, screen, cleanup, fireEvent, getByLabelText } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import SelectGenre from '../MainContent/SelectGenre';

afterEach(cleanup);

describe('RestaurantListコンポーネント', () => {
    test('検索ボタンが表示されているか', async () => {
        await act(async () => {
            const setIsProcessing = jest.fn();
            const setPosition = jest.fn();
            const setIsLoadedLocationInfo = jest.fn();
            const setErrorMessage = jest.fn();
            const setgenre = jest.fn();
            const setGenreList = jest.fn();
            const setUrl = jest.fn();
            const setShops = jest.fn();
            const setIsLoadedShopInfo = jest.fn();

            const dom = render(<SelectGenre
                setIsProcessing={setIsProcessing}
                setPosition={setPosition}
                setIsLoadedLocationInfo={setIsLoadedLocationInfo}
                setErrorMessage={setErrorMessage}
                setgenre={setgenre}
                setGenreList={setGenreList}
                setUrl={setUrl}
                setShops={setShops}
                setIsLoadedShopInfo={setIsLoadedShopInfo}
                genre={""}
                position={{ latitude: 0, longitude: 0 }}
                genreList={[]}
                isLoadedLocationInfo={false}
                url={""}
            />);
            expect(screen.getByText('現在地よりお店を検索')).toBeInTheDocument();
        })
    });

    test.skip('ジャンル取得APIから情報を取得できているかは目視にて確認', () => { });

    test.skip('ジャンルを選択し、現在地よりお店を検索ボタンを押すと、現在地を取得するかは目視で確認', () => { });

    test.skip('現在地、ジャンルよりURLを作成し、お店の情報を取得できているかを目視で確認', () => { });

});
