import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Text } from '@/components';

describe('Text', () => {
  it('should render correctly', () => {
    render(<Text />);

    expect(screen.getByTestId('Text')).toBeInTheDocument();
  });
});
