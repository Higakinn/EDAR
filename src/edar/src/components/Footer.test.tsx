import Footer from './Footer';
import { render, screen } from '@testing-library/react';

test('footer: 指定した引数がレンダリングされているかどうか', () => {
    render(<Footer title="sample" description="Samplesample" />);
    const titleText = screen.getByText("sample");
    const descriptionText = screen.getByText("Samplesample");
    expect(titleText).toBeInTheDocument();
    expect(descriptionText).toBeInTheDocument();
});