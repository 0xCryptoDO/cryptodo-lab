import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Space } from '@/components';

describe('Space', () => {
  it('should render correctly', () => {
    render(<Space />);

    expect(screen.getByTestId('Space')).toBeInTheDocument();
  });
});
