import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { ThemeSwitcher } from '@/components';

describe('ThemeSwitcher', () => {
  it('should render correctly', () => {
    render(<ThemeSwitcher />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
