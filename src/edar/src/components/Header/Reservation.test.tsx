import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Delivery from './Delivery';

afterEach(cleanup);


describe('Reservationコンポーネント', () => {
    const items = [
        { menuLabel: "飲食店予約", menuIcon: HomeIcon },
        { menuLabel: "デリバリ-", menuIcon: LocalMallIcon },
        { menuLabel: "テイクアウト", menuIcon: StorefrontIcon },
        { menuLabel: "アカウント", menuIcon: AccountBoxIcon },
    ];

    test('予約ボタンの表示', () => {
        render(<Delivery menuLabel={items[0].menuLabel} menuIcon={items[0].menuIcon} />);
        expect(screen.getByText(items[0].menuLabel)).toBeInTheDocument();
    });
});
