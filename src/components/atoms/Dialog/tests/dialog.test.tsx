import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Dialog } from '@/components';

describe('Dialog', () => {
  it('should render correctly', () => {
    render(<Dialog open />);

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
  });
});
