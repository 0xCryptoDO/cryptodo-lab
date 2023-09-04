import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import { Badge } from '@/components';

describe('Badge', () => {
  it('should render correctly', () => {
    render(<Badge color="green">{123}</Badge>);

    expect(screen.getByText('123')).toBeInTheDocument();
  });
});
