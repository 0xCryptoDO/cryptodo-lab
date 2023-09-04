import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { TextArea } from '@/components';

describe('TextArea', () => {
  it('should render correctly', () => {
    render(<TextArea />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});
