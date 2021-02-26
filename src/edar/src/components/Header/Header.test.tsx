import Header from './Header';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from '../../store';

test('header: 指定した引数がレンダリングされているかどうか', () => {
    render(
        <Provider store={store}>
            <Header title="Test" subtitle="testtest" />
        </Provider>
    );
    const titleText = screen.getByText(/Test/);
    const subtitleText = screen.getByText(/testtest/);
    expect(titleText).toBeInTheDocument();
    expect(subtitleText).toBeInTheDocument();
});
