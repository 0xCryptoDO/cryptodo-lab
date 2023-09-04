import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Input } from '@/components';

describe('Input', () => {
  it('should render correctly', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
