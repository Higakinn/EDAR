import EdarSiteContent from './EdarSiteContent';
import { render, screen } from '@testing-library/react';

test('EdarSiteContent: 適切なtitleが取得できるかどうか', () => {
    const container = render(<EdarSiteContent />);
    expect(container.getByTitle('food image')).toBeInTheDocument();
});