import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HomeIcon from '@material-ui/icons/Home';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import StorefrontIcon from '@material-ui/icons/Storefront';
import { Account } from './Account';

afterEach(cleanup);

jest.mock('../../stores/shopInformation');
jest.mock('react-redux');
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

type State = {
    user: {
        email: string | null
        displayName: string | null
        photoURL: string | null
    }
    isLoggedIn: boolean
}

describe('Accountコンポーネント>ログインしていない状態', () => {
    const headerMenus = {
        reservation: { menuLabel: "飲食店予約", menuIcon: HomeIcon },
        delivery: { menuLabel: "デリバリ-", menuIcon: LocalMallIcon },
        takeOut: { menuLabel: "テイクアウト", menuIcon: StorefrontIcon },
        account: { menuLabel: "アカウント", menuIcon: AccountBoxIcon },
    };
    const initialState: State = {
        user: {
            email: null,
            displayName: null,
            photoURL: null,
        },
        isLoggedIn: false,
    };

    beforeEach(() => {
        useSelectorMock.mockReturnValue(initialState);
        useDispatchMock.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    test('アカウントボタンの表示', () => {
        render(<Account menuLabel={headerMenus.account.menuLabel} menuIcon={headerMenus.account.menuIcon} />);
        expect(screen.getByText(headerMenus.account.menuLabel)).toBeInTheDocument();
    });

    test('アカウントダイアログのキャンセルボタンが表示されているか', () => {
        render(<Account menuLabel={headerMenus.account.menuLabel} menuIcon={headerMenus.account.menuIcon} />);
        expect(screen.getByText('キャンセル')).toBeInTheDocument();
    });
});

describe('Accountコンポーネント>ログインしている状態', () => {
    const headerMenus = {
        reservation: { menuLabel: "飲食店予約", menuIcon: HomeIcon },
        delivery: { menuLabel: "デリバリ-", menuIcon: LocalMallIcon },
        takeOut: { menuLabel: "テイクアウト", menuIcon: StorefrontIcon },
        account: { menuLabel: "アカウント", menuIcon: AccountBoxIcon },
    };
    const initialState: State = {
        user: {
            email: 'test@test.com',
            displayName: 'test',
            photoURL: 'http://test.com',
        },
        isLoggedIn: true,
    };

    beforeEach(() => {
        useSelectorMock.mockReturnValue(initialState);
        useDispatchMock.mockReturnValue(jest.fn());
    });

    afterEach(() => {
        jest.resetAllMocks()
    });

    test('ログイン中のメールアドレスが表示されているか', () => {
        render(<Account menuLabel={headerMenus.account.menuLabel} menuIcon={headerMenus.account.menuIcon} />);
        expect(screen.getByText(initialState.user.email + 'でログインしています。')).toBeInTheDocument();
    });
});
