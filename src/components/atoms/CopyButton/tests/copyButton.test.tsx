import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CopyButton } from '@/components';

describe('CopyButton', () => {
  it('should render correctly', () => {
    render(<CopyButton content="tiger" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
