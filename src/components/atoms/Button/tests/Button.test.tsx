import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Button } from '@/components';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
