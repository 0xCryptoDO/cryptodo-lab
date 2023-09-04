import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { NumberInput } from '@/components';

describe('Loader', () => {
  it('should render correctly', () => {
    render(<NumberInput />);

    expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
});
