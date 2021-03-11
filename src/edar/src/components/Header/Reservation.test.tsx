import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Delivery } from './Delivery';

afterEach(cleanup);


describe('Reservationコンポーネント', () => {
    const headerMenus = {
        reservation: { menuLabel: "飲食店予約", menuIcon: HomeIcon },
        delivery: { menuLabel: "デリバリ-", menuIcon: LocalMallIcon },
        takeOut: { menuLabel: "テイクアウト", menuIcon: StorefrontIcon },
        account: { menuLabel: "アカウント", menuIcon: AccountBoxIcon },
    };

    test('予約ボタンの表示', () => {
        render(<Delivery menuLabel={headerMenus.reservation.menuLabel} menuIcon={headerMenus.reservation.menuIcon} />);
        expect(screen.getByText(headerMenus.reservation.menuLabel)).toBeInTheDocument();
    });
});
