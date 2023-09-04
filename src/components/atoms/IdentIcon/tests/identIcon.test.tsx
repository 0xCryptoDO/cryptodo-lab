import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { IdentIcon } from '@/components';

describe('IdentIcon', () => {
  it('should render correctly', () => {
    render(<IdentIcon id={1} />);

    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
