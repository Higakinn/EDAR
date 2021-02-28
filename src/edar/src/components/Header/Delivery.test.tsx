import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import Delivery from './Delivery';

afterEach(cleanup);

describe('Deliveryコンポーネント', () => {
    const items = [
        { message: "飲食店予約", icon: HomeIcon },
        { message: "デリバリ-", icon: LocalMallIcon },
        { message: "テイクアウト", icon: StorefrontIcon },
        { message: "アカウント", icon: AccountBoxIcon },
    ];

    test('デリバリーボタンの表示', () => {
        render(<Delivery message={items[1].message} icon={items[1].icon} />);
        expect(screen.getByText(items[1].message)).toBeInTheDocument();
    });
});
