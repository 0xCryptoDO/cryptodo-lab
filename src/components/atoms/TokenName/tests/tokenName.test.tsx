import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TokenName } from '@/components';

describe('TokenName', () => {
  it('should render correctly', () => {
    render(<TokenName name="Bitcoin" symbol="BTC" />);

    expect(screen.getByText('Bitcoin')).toBeInTheDocument();
    expect(screen.getByText('BTC')).toBeInTheDocument();
  });
});
