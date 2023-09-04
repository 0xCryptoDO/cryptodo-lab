import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { DatePicker } from '@/components';

jest.mock('react-datepicker', () => () => (
  <div data-testid="react-datepicker" />
));

describe('DatePicker', () => {
  it('should render correctly', () => {
    render(
      <DatePicker
        value={new Date(1)}
        onChange={(date) => date}
        onBlur={() => null}
      />
    );

    expect(screen.getByTestId('react-datepicker')).toBeInTheDocument();
  });
});
