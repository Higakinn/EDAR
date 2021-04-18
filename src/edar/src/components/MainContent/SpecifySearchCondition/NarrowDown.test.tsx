import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { NarrowDown } from './NarrowDown';
import { useSelector, useDispatch } from 'react-redux';
import userEvent from '@testing-library/user-event';

afterEach(cleanup);

jest.mock('../../../stores/shopInformation');
jest.mock('react-redux');
const useSelectorMock = useSelector as jest.Mock;
const useDispatchMock = useDispatch as jest.Mock;

type State = {
  range: {
    code: string;
    label: string;
  };
};

describe('NarrowDownコンポーネント', () => {
  const testData: State = {
    range: {
      code: '3',
      label: '～1000m',
    },
  };

  beforeEach(() => {
    useSelectorMock.mockReturnValue(testData);
    useDispatchMock.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('絞り込みボタンが表示されているか', () => {
    render(<NarrowDown />);
    expect(screen.getByTestId('narrowDown')).toBeInTheDocument();
  });

  test('絞り込みボタンが押されて、距離オプションが表示されるか', () => {
    render(<NarrowDown />);
    userEvent.click(screen.getByTestId('narrowDown'));
    expect(screen.getByText('距離')).toBeInTheDocument();
  });

  test.skip('距離のデフォルト値は「～1000m」であることを目視で確認', () => {});

  test.skip('絞り込みダイアログを表示して、距離を選択して「設定する」を押すとそれに応じてお店表示されるのを目視で確認', () => {});

  test.skip('絞り込みオプションのダイアログ表示して、デフォルト値以外を選んで「キャンセル」を押すと、前回値を設定することを目視で確認', () => {});
});
