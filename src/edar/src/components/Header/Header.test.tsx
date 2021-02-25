import Header from './Header';
import { render, screen } from '@testing-library/react';

test('header: 指定した引数がレンダリングされているかどうか', () => {
    render(<Header title="Test" subtitle="testtest" />);
    const titleText = screen.getByText(/Test/);
    const subtitleText = screen.getByText(/testtest/);
    expect(titleText).toBeInTheDocument();
    expect(subtitleText).toBeInTheDocument();
});
