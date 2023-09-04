import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Divider } from '@/components';

describe('Divider', () => {
  it('should render correctly', () => {
    render(<Divider />);

    expect(screen.getByTestId('divider')).toBeInTheDocument();
  });
});
